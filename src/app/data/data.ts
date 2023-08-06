interface Category {
    name: string,
    subcategory: string[]
}

const categories : Category[] = [
    {
        name: 'General',
        subcategory: ['a', 'b']
    },
    {
        name: 'Food',
        subcategory: []
    },
    {
        name: 'Health',
        subcategory: []
    },
    {
        name: 'Material',
        subcategory: []
    },
    {
        name: 'Artifact',
        subcategory: []
    }
];

export { categories };