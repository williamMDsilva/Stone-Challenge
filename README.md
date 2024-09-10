# Stone Challenge

<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
<img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">

This repository has the stone challenge for backend. The solution is based on onion architecture.

## Table of Contents

- [Documentation](#documentation)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Database Migration](#database-migration)
- [Testing](#testing)
- [License](#license)

## Documentation

**Documentation of each endpoint in [./docs](./docs)**

### folder struct

#### 1. `./src/domain`

**Description:** This folder contains the core domain logic of the application, which is the heart of the application. It is responsible for encapsulating business rules and core entities. Here, you will find domain modeling, which may include entities, value objects, aggregates, and business rules.

#### 2. `./src/domain/entity`

**Description:** Contains definitions of domain entities. Entities are objects with a distinct identity responsible for maintaining state and specific behavior within the domain. Examples of entities include User, Order, or Product.

#### 3. `./src/domain/exception`

**Description:** Stores domain-specific exceptions. These exceptions are used to handle errors or exceptional situations that occur within the business rules and should not be mixed with infrastructure or interface exceptions.

#### 4. `./src/domain/gateway`

**Description:** Contains interfaces or abstractions defining how the domain layer communicates with other parts of the system, such as repositories and external services. These interfaces are implemented in the infrastructure layers.

#### 5. `./src/helper`

**Description:** Includes utilities and helper functions used across various parts of the application. It may contain generic functions, helpers, and utilities that do not belong to a specific domain.

#### 6. `./src/infra`

**Description:** This folder is responsible for implementing the interfaces defined in the domain, such as data persistence, communication with external services, and other infrastructure details. The infrastructure layer connects the domain with underlying technology.

#### 7. `./src/infra/api`

**Description:** Contains the implementation of API communication interfaces, such as controllers and routes. Here, you define how HTTP requests are handled and mapped to the domain and use cases.

#### 8. `./src/infra/api/express`

**Description:** Specific to applications using the Express.js framework. Contains Express configuration and handlers, such as route definitions, middleware, and integration with domain logic.

#### 9. `./src/infra/repository`

**Description:** Implements repositories responsible for data persistence and retrieval. The repository layer maps domain entities to data storage and vice versa.

#### 10. `./src/infra/repository/prisma`

**Description:** Contains the implementation of repositories using Prisma as an ORM (Object-Relational Mapping). Prisma is a tool for mapping and interacting with relational databases.

#### 11. `./src/infra/repository/redis`

**Description:** Implements repositories that use Redis for data storage. Redis can be used for caching, sessions, and storing temporary or persistent data.

#### 12. `./src/infra/service`

**Description:** Contains services that offer auxiliary functionalities and integrations with external systems. These services are used by the domain layer and use cases to perform operations not directly related to business rules.

#### 13. `./src/infra/service/password`

**Description:** Contains services specific to handling password-related operations, such as hashing, validation, and verification. Typically includes logic for security and encryption.

#### 14. `./src/infra/service/session`

**Description:** Implements services related to session management, such as creating, validating, and managing session tokens or cookies.

#### 15. `./src/infra/service/user`

**Description:** Contains services specific to user-related operations, such as authentication, authorization, and user profile management.

#### 16. `./src/usecase`

**Description:** Defines the application's use cases, which represent the actions or operations the system must perform from the user's perspective. Use cases coordinate the interaction between the domain layer and the infrastructure layer to carry out specific operations.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v20+ and npm installed
- Docker and Docker Compose installed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/williamMDsilva/Stone-Challenge
   cd Stone-Challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create and configure the environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your database credentials and other configurations.

4. Generate prisma client

```bash
npm run prisma generate
```

## Usage

### Running the Application

To start the application in development mode, run:

```bash
npm run dev
```

### Building the Application

To build the application for production:

```bash
npm run build
```

## Environment Variables

Ensure you set up the following environment variables in your `.env` file:

- `DATABASE_URL`: Connection string for your Prisma database
- `PORT`: The port on which your Node.js server will run
- `REDIS_URL`: connection string to redis
- `NODE_ENV`: Select of envirounment
- `ROUNDS`: Numbers of rounds os to passwords
- `SECRET`: Srint salt to password
- `EXP`: time to token expires

## Docker Setup

### Building and Running with Docker Compose

1. Build the Docker image:

   ```bash
   docker-compose build
   ```

2. Start the containers:

   ```bash
   docker-compose up
   ```

3. Access the application at `http://localhost:PORT`, where `PORT` is the port you specified in your `.env` file.

### Stopping the Containers

To stop the running containers:

```bash
docker-compose down
```

## Database Migration

This project uses Prisma for database migrations. To apply migrations, run:

```bash
npx prisma migrate dev
```

For production, use:

```bash
npx prisma migrate deploy
```

## Testing

To run tests, use the following command:

- database to test: stone_challenge_test

```bash
NODE_ENV=test npx prisma migrate dev
```

```bash
npm test
```

```bash
npm test <path>
```
