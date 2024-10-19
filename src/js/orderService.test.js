
const OrderService = require('./orderService');

describe('OrderService', () => {
  let orderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  test('createNewOrder deve criar um novo pedido', () => {
    const newOrder = orderService.createNewOrder();
    expect(newOrder).toEqual({
      id: 1,
      products: [],
      status: 'open'
    });
  });

  test('addProductToOrder deve adicionar um produto ao pedido atual', () => {
    orderService.createNewOrder();
    orderService.addProductToOrder('Product 1', 'Description 1');
    expect(orderService.currentOrder.products).toEqual([
      { name: 'Product 1', description: 'Description 1' }
    ]);
  });

  test('removeProductFromOrder deve remover um produto ao pedido atual', () => {
    orderService.createNewOrder();
    orderService.addProductToOrder('Product 1', 'Description 1');
    orderService.addProductToOrder('Product 2', 'Description 2');
    orderService.removeProductFromOrder(0);
    expect(orderService.currentOrder.products).toEqual([
      { name: 'Product 2', description: 'Description 2' }
    ]);
  });

  test('closeOrder deve fechar o pedido atual se tiver produtos', () => {
    orderService.createNewOrder();
    orderService.addProductToOrder('Product 1', 'Description 1');
    orderService.closeOrder();
    expect(orderService.currentOrder.status).toBe('closed');
  });

  test('closeOrder não deve fechar o pedido atual se não tiver produtos', () => {
    orderService.createNewOrder();
    orderService.closeOrder();
    expect(orderService.currentOrder.status).toBe('open');
  });

  test('listOrders deve retornar todos os pedidos', async () => {
    orderService.createNewOrder();
    orderService.createNewOrder();
    const orders = await orderService.listOrders();
    expect(orders.length).toBe(2);
  });
});