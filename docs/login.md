# Endpoint de Login

## POST /api/login

##### Descrição:

Realiza o login do usuário e retorna um token de autenticação.

##### Headers:

##### Body

```JSON
{
    "email": "meumelhoremail@email.com",
    "password": "Teste123w$%"
}

```

##### Resposta:

Retorna um token JWT para autenticação nas futuras requisições.
