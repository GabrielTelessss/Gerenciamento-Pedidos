# Gerenciamento de Pedidos

Este projeto é um sistema de gerenciamento de pedidos que permite criar, gerenciar e gerar relatórios sobre pedidos e produtos. A aplicação é desenvolvida em **HTML**, **CSS** e **JavaScript**, utilizando a biblioteca **jsPDF** para a geração de relatórios em PDF.

## Funcionalidades

### 1. Cadastro de Produtos
Permite adicionar novos produtos com nome, descrição e preço ao sistema.

![Cadastro de Produtos](https://github.com/user-attachments/assets/cba7f140-9437-4801-b3cf-6733fb31e3c7)

### 2. Gerenciamento de Pedidos
Permite a criação de novos pedidos, a adição de produtos a pedidos existentes e o fechamento de pedidos. 

- **Criação de novos pedidos**: O usuário pode adicionar produtos ao pedido em andamento.

![Criação de Pedido](https://github.com/user-attachments/assets/fd26a699-7d6d-4df2-a73a-74e5af9f9c5c)

- **Gestão de produtos no pedido**: Produtos podem ser adicionados e removidos conforme necessário.

![Gerenciamento de Produtos no Pedido](https://github.com/user-attachments/assets/02cebb4a-9a99-44f8-b325-7f6aadefcb31)

- **Fechamento de pedido**: Após adicionar os produtos, o pedido pode ser fechado.

![Fechamento de Pedido](https://github.com/user-attachments/assets/a47044b9-037f-4729-bbf5-da18fa5d97ff)

- **Visualização de pedidos**: Lista e status dos pedidos, podendo ser filtrados entre abertos e fechados.

![Lista de Pedidos](https://github.com/user-attachments/assets/c210c08b-6530-4a92-b116-06ad109e8733)

### 3. Geração de Relatórios
Possibilita a geração de relatórios em PDF dos pedidos criados, filtrando por status (aberto ou fechado).

- **Seleção de pedidos para relatório**: O usuário escolhe os filtros e os pedidos a serem incluídos no PDF.

![Filtros de Relatórios](https://github.com/user-attachments/assets/f1bad0cd-1f8e-45fb-8b01-d788c800fa94)

- **PDF gerado**: Relatório gerado pela biblioteca jsPDF com as informações dos pedidos.

![PDF Gerado](https://github.com/user-attachments/assets/0284f0e5-1fb5-4303-9764-004f20906652)

### 4. Interface Interativa
Interface amigável, facilitando o uso e navegação pelas funcionalidades do sistema.

## Tecnologias Utilizadas

- **HTML**: Estrutura das páginas.
- **CSS**: Estilização da interface.
- **JavaScript**: Funcionalidades interativas (cadastro, gerenciamento, relatórios).
- **jsPDF**: Biblioteca usada para geração de PDFs.

## Instalação

Para executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielTelessss/Gerenciamento-Pedidos
   cd Gerenciamento-Pedidos
