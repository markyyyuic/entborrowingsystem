export const ProductService = {
    getProductsData() {
        return [
            {
                id: '22000000419',
                code: 'f230fh0g3',
                name: 'Mark Anthony H. Nisnea',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                equipment: 'USB',
                quantity: 2,
                date: '21-04-2024',
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '22000000245',
                code: 'nvklal433',
                name: 'Xaian Paul Belderol',
                description: 'Product Description',
                image: 'black-watch.jpg',
                price: 72,
                equipment: 'G.WIRE',
                quantity: 1,
                date: '1-04-2024',
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '22000000113',
                code: 'zz21cz3c1',
                name: 'Janilla Page Conde',
                description: 'Product Description',
                image: 'blue-band.jpg',
                price: 79,
                equipment: 'Fitness',
                quantity: 2,
                date: '15-04-2024',
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },
            {
                id: '22000000214',
                code: 'zz21cz3c1',
                name: 'Deniega Resti',
                description: 'Product Description',
                image: 'blue-band.jpg',
                price: 79,
                equipment: 'Cable',
                quantity: 2,
                date: '11-04-2024',
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

