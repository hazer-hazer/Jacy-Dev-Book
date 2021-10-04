module.exports = {
    title: 'Table of contents',
    children: {
        intro: {
            order: 2,
            title: 'Introduction',
        },
        concept: {
            order: 3,
            title: 'Concept',
        },
        'how-to-run': {
            order: 5,
            title: 'How To Run',
        },
        cli: {
            order: 6,
            title: 'CLI',
        },
        'compiler-workflow': {
            order: 10,
            title: 'Compiler Workflow',
            children: {
                'parsing-stage': {
                    order: 5,
                    title: 'Parsing & AST',
                },
                'name-res-stage': {
                    order: 10,
                    title: 'Names & Imports',
                    children: {
                        'module-tree-building': {
                            order: 2,
                            title: 'Module Tree Building',
                        },
                        'importation-&-module-system': {
                            order: 4,
                            title: 'Imports & Module System',
                        },
                        'name-resolution': {
                            order: 6,
                            title: 'Name Resolution',
                        },
                    },
                },
                lowering: {
                    order: 15,
                    title: 'Lowering & HIR',
                },
                'type-system': {
                    order: 50,
                    title: 'Type System',
                },
            },
        },
        'code-docs': {
            order: 30,
            title: 'Code docs',
        },
        'user-guide': {
            order: 45,
            title: 'User Guide',
        },
        roadmaps: {
            order: 46,
            title: 'Roadmaps',
            children: {
                'v0.1.0': {
                    order: 1,
                    title: 'v0.1.0 [First alpha version]',
                },
            },
        },
        lincy: {
            order: 48,
            title: 'Lincy [Linter]',
        },
        ideas: {
            order: 50,
            title: 'Ideas [α RFCs]',
            children: {
                'extended-tools': {
                    order: 10,
                    title: 'Extensions & External tools',
                },
            },
        },
        particles: {
            order: 60,
            title: 'Particles [β RFCs]',
            children: {},
        },
        appendices: {
            order: 100,
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
