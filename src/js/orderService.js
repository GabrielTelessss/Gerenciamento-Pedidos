class OrderService {
    constructor() {
        this.orders = [];
        this.currentOrder = null;
        this.products = [];
    }

    listOrders() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.orders), 500);
        });
    }

    createNewOrder() {
        const newOrder = {
            id: this.orders.length + 1,
            products: [],
            status: 'Aberto'
        };
        this.orders.push(newOrder);
        this.currentOrder = newOrder;
        return newOrder;
    }

    registerProduct(name, description) {
        const newProduct = {
            id: this.products.length + 1,
            name: name,
            description: description
        };
        this.products.push(newProduct);
        return newProduct;
    }

    addProductToOrder(productId) {
        if (this.currentOrder && this.currentOrder.status === 'Aberto') {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                this.currentOrder.products.push({...product});
                return true;
            }
        }
        return false;
    }

    listProducts() {
        return [...this.products];
    }

    removeProductFromOrder(index) {
        if (this.currentOrder && this.currentOrder.status === 'Aberto') {
            this.currentOrder.products.splice(index, 1);
        }
    }

    closeOrder() {
        if (this.currentOrder && this.currentOrder.products.length > 0) {
            this.currentOrder.status = 'Fechado';
            return true;
        }
        return false;
    }
    
}

const orderService = new OrderService();
module.exports = OrderService;
