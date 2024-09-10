# 1. Endpoint de Histórico de Compras

## GET /api/history

##### Descrição:

Obtém o histórico de compras do usuário.

##### Headers:

- Content-Type: application/json
- Authorization: Bearer {token}

##### Resposta:

Retorna uma lista de compras realizadas pelo usuário.

# 2. Endpoint de Histórico de Compras por usuario

## GET /api/history/{clientId}

##### Descrição:

Obtém os detalhes de uma compra específica pelo Id do cliente.

##### Headers:

- Content-Type: application/json
- Authorization: Bearer {token}

##### Resposta:

Retorna uma lista de compras realizadas pelo cliente.
