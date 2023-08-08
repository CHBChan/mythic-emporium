interface Category {
    name: string,
    subcategory: string[]
};

const categories : Category[] = [
    {
        name: 'All',
        subcategory: []
    },
    {
        name: 'General',
        subcategory: []
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

const brands : string[] = [
    'All',
    'Misc. Vendor',
];

const origins : string[] = [
    'All',
    'Farm Realm',
];

export { categories, brands, origins };