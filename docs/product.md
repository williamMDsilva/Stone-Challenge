# 1. Endpoint de Cadastro de Produto

## POST /api/product

##### Descrição:

Cadastra um novo produto.

##### Headers:

- Content-Type: application/json
- Authorization: Bearer {token}

##### Body:

```JSON
{
   "title": "Blusa do Imperio 01",
   "price": 7990,
   "zipcode": "78993-000",
   "seller": "João da Silva",
   "thumbnailHd": "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
   "date": "26/11/2015"
}
```

##### Resposta:

Retorna a confirmação do cadastro do produto ou um erro.

# 2. Endpoint de Listagem de Produtos

## GET /api/product

##### Descrição:

Obtém a lista de produtos disponíveis.

##### Headers:

- Authorization: Bearer {token}

##### Resposta:

Retorna uma lista de produtos cadastrados.
