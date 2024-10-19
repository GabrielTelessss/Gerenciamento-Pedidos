class OrderService {
    constructor() {
        this.orders = [];
        this.currentOrder = null;
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
            status: 'open'
        };
        this.orders.push(newOrder);
        this.currentOrder = newOrder;
        return newOrder;
    }

    addProductToOrder(product, description) {
        if (this.currentOrder && this.currentOrder.status === 'open') {
            this.currentOrder.products.push({
                name:product,
                description: description
            });
        }
    }

    removeProductFromOrder(index) {
        if (this.currentOrder && this.currentOrder.status === 'open') {
            this.currentOrder.products.splice(index, 1);
        }
    }

    closeOrder() {
        if (this.currentOrder && this.currentOrder.products.length > 0) {
            this.currentOrder.status = 'closed';
        }
    }
}

const orderService = new OrderService(); 
module.exports = OrderService;
