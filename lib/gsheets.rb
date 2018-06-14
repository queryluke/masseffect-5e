GSHEETS = [
    {
        type: 'armor_mods',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIPzbOBXOdWbaY779un1EV3HyacCV3fe15kHW4ABjMV0yHi3GZHVqnbiOVSQ_Dgh1whimOITGOXHkn/pub?output=csv',
        renderables: [],
        id: 'name'
    },
    {
        type: 'backgrounds',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSUXve_hXfyu3glsSiuz-Ju2YUUToorjPPjpfSPiaHaA6yZTKLGMehtmvKtfQ3lSDErrGXgsQp1tFT/pub?gid=0&single=true&output=csv',
        renderables: %w(feature_description description),
        id: 'name'
    },
    {
        type: 'feats',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPhVRIodUwbDYFw8wJZtmb63tTjFJMxY-cN6P5nayPpJhNxAQFqIxeSLd5Tz75aOZ7CLuBkNsDrcs9/pub?gid=0&single=true&output=csv',
        id: 'name',
        renderables: ['description']
    },
    {
        type: 'grenades_mines',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBAZH9BXc9xIj62i-StAKv08-iNSQSUyiWjz7TrVqcjEVe-uDaFIy9a4zRxYchDikCsskcNf-vexsG/pub?gid=0&single=true&output=csv',
        renderables: ['desc'],
        id: 'name'
    },
    {
        type: 'races',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQI4F-wI2gwN395GApB347yPb1PixjOtOqZ0qoBYw7d57MPETHS40ZjIy1-DIfZf06PUwrspMiuAMlk/pub?gid=0&single=true&output=csv',
        renderables: ['skills','starting_equipment'],
        id: 'name'
    },
    {
        type: 'racial_traits',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRETKGL62kEZPA69PhA3AGMiVeHOWBRkTMDL3f_K-oajryEjwdq7fRAj-qfIusPsLMiIqmB12D4Zun8/pub?gid=0&single=true&output=csv',
        renderables: ['description'],
        id: 'name'
    },
    {
        type: 'skills',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFYAlUo84hir8VGSHwP4pKqnTcih_5UD0Uqtgi9w-QHEvrSxLthv1xXG0jb_tpbBRNZXE1Dv0nF0_q/pub?gid=0&single=true&output=csv',
        renderables: [],
        id: 'name'
    },
    {
        type: 'spells',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBBF0TK7kMnvFK1JKOY0OnxXiRrFxBPd0gFE_D1e_mjdCL1hnIToBkAWOtfS1veIgTFsxajiAYcY6f/pub?gid=0&single=true&output=csv',
        renderables: ['mechanic'],
        id: 'name'
    },
    {
        type: 'thermal_clips',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmZ3vjTr5MljolyW6N_pnqxBA6Gj8lEw4VihCRj0jROiCDJdWOg5udY0_XIXnbKM8XvamqGawcHKBX/pub?gid=0&single=true&output=csv',
        renderables: [],
        id: 'name'
    },
    {
        type: 'weapons',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSq70x_GZuDKcELgX8k_7Hd6nLGu3DoIEdDwP-YEGjUU-ghGc7ot_Q7140FZwGbEalHgzPwVm4BN8y_/pub?gid=0&single=true&output=csv',
        renderables: ['notes'],
        id: 'name',
        camel: true
    },
    {
        type: 'classes',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=0&single=true&output=csv',
        renderables: ['starting_equipment'],
        id: 'name'
    },
    {
        type: 'engineer_progression',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=859616161&single=true&output=csv',
        renderables: [],
        camel: true
    },
    {
        type: 'sentinel_progression',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=1389384549&single=true&output=csv',
        renderables: [],
        camel: true
    },
    {
        type: 'infiltrator_progression',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=782961022&single=true&output=csv',
        renderables: [],
        camel: true
    },
    {
        type: 'vanguard_progression',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=1618519913&single=true&output=csv',
        renderables: [],
        camel: true
    },
    {
        type: 'soldier_progression',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=2098633418&single=true&output=csv',
        renderables: [],
        camel: true
    },
    {
        type: 'adept_progression',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=1256776098&single=true&output=csv',
        renderables: [],
        camel: true
    },
    {
        type: 'subclasses',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=596741267&single=true&output=csv',
        renderables: [],
        id: 'name',
        camel: true
    },
    {
        type: 'armor_mechanics',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIPzbOBXOdWbaY779un1EV3HyacCV3fe15kHW4ABjMV0yHi3GZHVqnbiOVSQ_Dgh1whimOITGOXHkn/pub?gid=300114352&single=true&output=csv',
        renderables: [],
        id: 'mechanic'
    },
    {
        type: 'armor_sets',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlWQ7v7esaQwLtD1yXcbiHM-jYHCzjC23cIfNFEcfbLhEcFSi8EIoLi1zZyCQtQFRneMqp02_pFWKH/pub?gid=0&single=true&output=csv',
        renderables: [],
        id: 'name'
    },
    {
        type: 'monster_features',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIwlLPyS6hKc2XoW5tm901kmWbiZD_cHiUBWrH2V-ceinyWWz5SiGFfnRehK4CWrewGWubXBldbesh/pub?gid=1564226847&single=true&output=csv',
        renderables: [],
        id: 'name',
        camel: true
    },
    {
        type: 'bestiary',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIwlLPyS6hKc2XoW5tm901kmWbiZD_cHiUBWrH2V-ceinyWWz5SiGFfnRehK4CWrewGWubXBldbesh/pub?gid=0&single=true&output=csv',
        renderables: [],
        id: 'name',
        camel: true
    },
    {
        type: 'conditions',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxNdrcVHvbqyeRuxHkMt2e8GYD92gMn5pTnxNI_1I3s1xC1nACWAgiSimFsgc3GIrcRfhYljjMymyJ/pub?gid=0&single=true&output=csv',
        renderables: [],
        id: 'name',
        camel: true
    },
    {
        type: 'weapon_mods',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRphibK9-tEg_9zoirocbeKnHIJpDSSVr721q4D5Wq9M4Eupx_vVJqVUzamgbHhM4bhyHrKn9PxQ0MV/pub?gid=0&single=true&output=csv',
        renderables: [],
        id: 'name',
        camel: true
    },
    {
        type: 'commonplace_items',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5DO-4Giug9mwmDRyBRQBkAJS8NqaqhXqN25fcIRN23oa58KdAZy0m15XDBMYvF7VOMomWWi_2NaIp/pub?output=csv',
        renderables: [],
        id: 'name',
        camel: true
    }
]