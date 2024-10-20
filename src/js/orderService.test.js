const OrderService = require('./orderService');

describe('OrderService', () => {
    let orderService;

    beforeEach(() => {
        orderService = new OrderService();
    });

    test('deve criar um novo pedido', () => {
        const order = orderService.createNewOrder();
        expect(order).toHaveProperty('id', 1);
        expect(order).toHaveProperty('status', 'Aberto');
        expect(orderService.orders).toHaveLength(1);
        expect(orderService.currentOrder).toEqual(order);
    });

    test('deve listar pedidos', async () => {
        orderService.createNewOrder();
        const orders = await orderService.listOrders();
        expect(orders).toHaveLength(1);
    });

    test('deve registrar um novo produto', () => {
        const product = orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        expect(product).toHaveProperty('id', 1);
        expect(product).toHaveProperty('name', 'Produto 1');
        expect(orderService.products).toHaveLength(1);
    });

    test('deve adicionar um produto ao pedido atual', () => {
        orderService.createNewOrder();
        const product = orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        const adicionado = orderService.addProductToOrder(product.id);
        expect(adicionado).toBe(true);
        expect(orderService.currentOrder.products).toHaveLength(1);
    });

    test('não deve adicionar um produto a um pedido fechado', () => {
        orderService.createNewOrder();
        const product = orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        orderService.closeOrder();
        const adicionado = orderService.addProductToOrder(product.id);
        expect(adicionado).toBe(false);
    });

    test('deve remover um produto do pedido atual', () => {
        orderService.createNewOrder();
        const product = orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        orderService.addProductToOrder(product.id);
        orderService.removeProductFromOrder(0);
        expect(orderService.currentOrder.products).toHaveLength(0);
    });

    test('deve fechar o pedido', () => {
        orderService.createNewOrder();
        orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        const fechado = orderService.closeOrder();
        expect(fechado).toBe(true);
        expect(orderService.currentOrder.status).toBe('Fechado');
    });

    test('não deve fechar um pedido sem produtos', () => {
        orderService.createNewOrder();
        const fechado = orderService.closeOrder();
        expect(fechado).toBe(false);
        expect(orderService.currentOrder.status).toBe('Aberto');
    });
});