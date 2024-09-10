# Endpoint de Compra

### POST /api/buy

#### Descrição:

Realiza uma compra com as informações fornecidas.

#### Headers:

- Content-Type: application/json
- Authorization: Bearer {token}

#### Body:

```JSON
{
    "clientId": "cc71e67e-8889-4e38-8fa0-8ad078a9bfaa",
    "clientName": "Luke Skywalker 02",
    "totalToPay": 670,
    "creditCard": {
        "cardNumber": "8977897897979",
        "value": 7990,
        "cvv": 789,
        "cardHolderName": "Luke Skywalker",
        "expDate": "12/24"
    }
}

```

##### Resposta:

O endpoint retorna uma confirmação da compra (status code 200) ou um erro (400 ou 401), conforme o processamento da solicitação.
