/**
 * @jest-environment jsdom
 */

const OrderService = require('./orderService');

describe('Script', () => {
  let orderService;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="btnNewOrder">Iniciar Novo Pedido</button>
      <section id="orderDetalisSection" style="display: none;"></section>
    `;

    OrderService.mockClear();
    orderService = new OrderService();
    global.orderService = orderService;

    jest.resetModules();
    require('./script');
  });

  test('deve criar um novo pedido quando o botão for clicado', () => {
    const btnNewOrder = document.getElementById('btnNewOrder');
    
    btnNewOrder.click();

    expect(orderService.createNewOrder).toHaveBeenCalled();
    
    expect(document.getElementById('orderDetalisSection').style.display).toBe('block');
  });
});