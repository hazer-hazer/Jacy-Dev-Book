module.exports = {
    title: 'Table of contents',
    children: {
        intro: {
            order: 2,
            title: 'Introduction',
        },
        'how-to-run': {
            order: 3,
            title: 'How To Run',
        },
        cli: {
            order: 4,
            title: 'CLI',
        },
        'compilation-process': {
            order: 10,
            title: 'Compilation Process',
        },
        'code-docs': {
            order: 30,
            title: 'Code docs',
        },
        'user-guide': {
            order: 45,
            title: 'User Guide',
        },
        'lincy': {
            order: 46,
            title: 'Lincy [Linter]',
        },
        appendices: {
            order: 50,
            title: 'Appendices',
            children: {
                cheatsheets: {
                    order: 10,
                    title: 'Appendices',
                },
                'jon-files': {
                    order: 40,
                    title: 'JON Files',
                },
                'syntax-decisions': {
                    order: 50,
                    title: 'Syntax Decisions',
                },
                spec: {
                    order: 50,
                    title: 'Specification [WIP]',
                },
                backlog: {
                    order: 100,
                    title: 'Backlog',
                },
            },
        },
    }
}
