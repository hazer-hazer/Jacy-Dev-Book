const IDENT_RE = '[\w][\w\d_]*|_[\w\d_]+';
const KEYWORDS = [
    '_'
];
const LITERALS = [
    'true',
    'false',
];

// bool|char|[ui](?:8|16|32|64|128)|f(?:16|32|64|128)|int|uint|str|String|Self|Option|Result
const TYPES = [
    'bool',
    'char',
    
    'uint',
    'u8',
    'u16',
    'u32',
    'u64',
    'u128',

    'int',
    'i8',
    'i16',
    'i32',
    'i64',
    'i128',

    'str',

    'String',
    'Self',
    'Option',
    'Result',
];

const ERROR_TYPES = [
    
];

const BUILT_IN_GLOBALS = [
    'Some',
    'None',
];

const BUILT_IN_VARIABLES = [
    'self',
    'super',
];

const BUILT_INS = [].concat(
    BUILT_IN_GLOBALS,
    TYPES,
    ERROR_TYPES
);

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
    if (!re) return null;
    if (typeof re === 'string') return re;

    return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
    return concat('(?=', re, ')');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
    const joined = args.map((x) => source(x)).join('');
    return joined;
}

/** @type LanguageFn */
function jacy(hljs) {
    /**
     * Takes a string like '<Booger' and checks to see
     * if we can find a matching '</Booger' later in the
     * content.
     * @param {RegExpMatchArray} match
     * @param {{after:number}} param1
     */
    const hasClosingTag = (match, { after }) => {
        const tag = '</' + match[0].slice(1);
        const pos = match.input.indexOf(tag, after);
        return pos !== -1;
    };

    const IDENT_RE$1 = IDENT_RE;
    const FRAGMENT = {
        begin: '<>',
        end: '</>'
    };
    const XML_TAG = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        /**
         * @param {RegExpMatchArray} match
         * @param {CallbackResponse} response
         */
        isTrulyOpeningTag: (match, response) => {
            const afterMatchIndex = match[0].length + match.index;
            const nextChar = match.input[afterMatchIndex];
            // nested type?
            // HTML should not include another raw `<` inside a tag
            // But a type might: `<Array<Array<number>>`, etc.
            if (nextChar === '<') {
                response.ignoreMatch();
                return;
            }
            // <something>
            // This is now either a tag or a type.
            if (nextChar === '>') {
                // if we cannot find a matching closing tag, then we
                // will ignore it
                if (!hasClosingTag(match, { after: afterMatchIndex })) {
                    response.ignoreMatch();
                }
            }
        }
    };
    const KEYWORDS$1 = {
        $pattern: IDENT_RE,
        keyword: KEYWORDS,
        literal: LITERALS,
        built_in: BUILT_INS,
        'variable.language': BUILT_IN_VARIABLES
    };

    const NUMBER = {
        className: 'number',
        variants: [
            // Dec
            {
                begin: '\\b([0-9][0-9_]*)(?:([ui](?:8|16|32|64|128)|i|u))?\\b',
            },

            // Hex
            {
                begin: '\\b(0x[a-fA-F0-9_]+)(?:([ui](?:8|16|32|64|128)|i|u))?\\b',
            },

            // Octal
            {
                begin: '\\b(0o[0-7_]+)(?:([ui](?:8|16|32|64|128)|i|u))?\\b',
            },

            // Bin
            {
                begin: '\\b(0b[01_]+)(?:([ui](?:8|16|32|64|128)|i|u))?\\b',
            },

            // Float
            {
                begin: '\\b([0-9][0-9_]*\\.[0-9][0-9_]*)\\b',
            },
            {
                begin: '\\b([0-9][0-9_]*(?:\\.[0-9][0-9_]*)?)(f32|f64|f|d)\\b',
            },
            {
                begin: '\\b([0-9][0-9_]*(?:\\.[0-9][0-9_]*)?[eE][+-]?[0-9_]+)(f32|f64|f|d)?\\b',
            }
        ],
        relevance: 0
    };

    const COMMENT = {
        className: 'comment',
        variants: [
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_LINE_COMMENT_MODE
        ]
    };

    const PARAMS = {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS$1,
        contains: PARAMS_CONTAINS
    };

    // ES6 classes
    const CLASS_OR_EXTENDS = {
        variants: [
            {
                match: [
                    /class/,
                    /\s+/,
                    IDENT_RE$1
                ],
                scope: {
                    1: 'keyword',
                    3: 'title.class'
                }
            },
            {
                match: [
                    /extends/,
                    /\s+/,
                    concat(IDENT_RE$1, '(', concat(/\./, IDENT_RE$1), ')*')
                ],
                scope: {
                    1: 'keyword',
                    3: 'title.class.inherited'
                }
            }
        ]
    };

    const CLASS_REFERENCE = {
        relevance: 0,
        match: /\b[A-Z][a-z]+([A-Z][a-z]+)*/,
        className: 'title.class',
        keywords: {
            _: [
                // se we still get relevance credit for JS library classes
                ...TYPES,
                ...ERROR_TYPES
            ]
        }
    };

    const USE_STRICT = {
        label: 'use_strict',
        className: 'meta',
        relevance: 10,
        begin: /^\s*['']use (strict|asm)['']/
    };

    const FUNCTION_DEFINITION = {
        variants: [
            {
                match: [
                    /function/,
                    /\s+/,
                    IDENT_RE$1,
                    /(?=\s*\()/
                ]
            },
            // anonymous function
            {
                match: [
                    /function/,
                    /\s*(?=\()/
                ]
            }
        ],
        className: {
            1: 'keyword',
            3: 'title.function'
        },
        label: 'func.def',
        contains: [PARAMS],
        illegal: /%/
    };

    const UPPER_CASE_CONSTANT = {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: 'variable.constant'
    };

    function noneOf(list) {
        return concat('(?!', list.join('|'), ')');
    }

    const FUNCTION_CALL = {
        match: concat(
            /\b/,
            noneOf([
                ...BUILT_IN_GLOBALS,
                'super'
            ]),
            IDENT_RE$1, lookahead(/\(/)),
        className: 'title.function',
        relevance: 0
    };

    const PROPERTY_ACCESS = {
        begin: concat(/\./, lookahead(
            concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
        )),
        end: IDENT_RE$1,
        excludeBegin: true,
        keywords: 'prototype',
        className: 'property',
        relevance: 0
    };

    const GETTER_OR_SETTER = {
        match: [
            /get|set/,
            /\s+/,
            IDENT_RE$1,
            /(?=\()/
        ],
        className: {
            1: 'keyword',
            3: 'title.function'
        },
        contains: [
            { // eat to avoid empty params
                begin: /\(\)/
            },
            PARAMS
        ]
    };

    const FUNC_LEAD_IN_RE = '(\\(' +
        '[^()]*(\\(' +
        '[^()]*(\\(' +
        '[^()]*' +
        '\\)[^()]*)*' +
        '\\)[^()]*)*' +
        '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

    const FUNCTION_VARIABLE = {
        match: [
            /const|var|let/, /\s+/,
            IDENT_RE$1, /\s*/,
            /=\s*/,
            lookahead(FUNC_LEAD_IN_RE)
        ],
        className: {
            1: 'keyword',
            3: 'title.function'
        },
        contains: [
            PARAMS
        ]
    };

    return {
        name: 'Jacy',
        aliases: ['jc'],
        keywords: KEYWORDS$1,
        // this will be extended by TypeScript
        exports: { PARAMS_CONTAINS },
        illegal: /#(?![$_A-z])/,
        contains: [
            hljs.SHEBANG({
                label: 'shebang',
                binary: 'node',
                relevance: 5
            }),
            USE_STRICT,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            HTML_TEMPLATE,
            CSS_TEMPLATE,
            TEMPLATE_STRING,
            COMMENT,
            NUMBER,
            CLASS_REFERENCE,
            {
                className: 'attr',
                begin: IDENT_RE$1 + lookahead(':'),
                relevance: 0
            },
            FUNCTION_VARIABLE,
            { // 'value' container
                begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
                keywords: 'return throw case',
                relevance: 0,
                contains: [
                    COMMENT,
                    hljs.REGEXP_MODE,
                    {
                        className: 'function',
                        // we have to count the parens to make sure we actually have the
                        // correct bounding ( ) before the =>.  There could be any number of
                        // sub-expressions inside also surrounded by parens.
                        begin: FUNC_LEAD_IN_RE,
                        returnBegin: true,
                        end: '\\s*=>',
                        contains: [
                            {
                                className: 'params',
                                variants: [
                                    {
                                        begin: hljs.UNDERSCORE_IDENT_RE,
                                        relevance: 0
                                    },
                                    {
                                        className: null,
                                        begin: /\(\s*\)/,
                                        skip: true
                                    },
                                    {
                                        begin: /\(/,
                                        end: /\)/,
                                        excludeBegin: true,
                                        excludeEnd: true,
                                        keywords: KEYWORDS$1,
                                        contains: PARAMS_CONTAINS
                                    }
                                ]
                            }
                        ]
                    },
                    { // could be a comma delimited list of params to a function call
                        begin: /,/,
                        relevance: 0
                    },
                    {
                        match: /\s+/,
                        relevance: 0
                    },
                    { // JSX
                        variants: [
                            { begin: FRAGMENT.begin, end: FRAGMENT.end },
                            {
                                begin: XML_TAG.begin,
                                // we carefully check the opening tag to see if it truly
                                // is a tag and not a false positive
                                'on:begin': XML_TAG.isTrulyOpeningTag,
                                end: XML_TAG.end
                            }
                        ],
                        subLanguage: 'xml',
                        contains: [
                            {
                                begin: XML_TAG.begin,
                                end: XML_TAG.end,
                                skip: true,
                                contains: ['self']
                            }
                        ]
                    }
                ],
            },
            FUNCTION_DEFINITION,
            {
                // prevent this from getting swallowed up by function
                // since they appear 'function like'
                beginKeywords: 'while if switch catch for'
            },
            {
                // we have to count the parens to make sure we actually have the correct
                // bounding ( ).  There could be any number of sub-expressions inside
                // also surrounded by parens.
                begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
                    '\\(' + // first parens
                    '[^()]*(\\(' +
                    '[^()]*(\\(' +
                    '[^()]*' +
                    '\\)[^()]*)*' +
                    '\\)[^()]*)*' +
                    '\\)\\s*\\{', // end parens
                returnBegin: true,
                label: 'func.def',
                contains: [
                    PARAMS,
                    hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: 'title.function' })
                ]
            },
            // catch ... so it won't trigger the property rule below
            {
                match: /\.\.\./,
                relevance: 0
            },
            PROPERTY_ACCESS,
            // hack: prevents detection of keywords in some circumstances
            // .keyword()
            // $keyword = x
            {
                match: '\\$' + IDENT_RE$1,
                relevance: 0
            },
            {
                match: [/\bconstructor(?=\s*\()/],
                className: { 1: 'title.function' },
                contains: [PARAMS]
            },
            FUNCTION_CALL,
            UPPER_CASE_CONSTANT,
            CLASS_OR_EXTENDS,
            GETTER_OR_SETTER,
            {
                match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
            }
        ]
    };
}

module.exports = jacy;
