class OrderService {
    constructor() {
        this.orders = [];
        this.currentOrder = null;
        this.products = [];
        this.orderIdCounter = 1;
    }

    listOrders() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.orders), 500);
        });
    }

    createNewOrder() {
        const newOrder = {
            id: this.orderIdCounter++,
            products: [],
            status: 'Aberto',
            total: 0
        };
        this.orders.push(newOrder);
        this.currentOrder = newOrder;
        return newOrder;
    }

    registerProduct(name, description, price) {
        const newProduct = {
            id: this.products.length + 1,
            name: name,
            description: description,
            price: price
        };
        this.products.push(newProduct);
        return newProduct;
    }

    addProductToOrder(productId) {
        if (this.currentOrder && this.currentOrder.status === 'Aberto') {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                this.currentOrder.products.push({ ...product });
                this.currentOrder.total += product.price;
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
            const product = this.currentOrder.products[index];
            this.currentOrder.total -= product.price;
            this.currentOrder.products.splice(index, 1);
        }
    }

    removeOrder(orderId) {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex > -1) {
            this.orders.splice(orderIndex, 1);
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