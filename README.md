# digital-wallet-open-api

This is an open book. Maintains account balances and transaction between wallets. No authentication/ autherization.

## Getting Started

### Install node & npm
Visit [node website](https://nodejs.org/en/download/)

### Install typescript globally
```
npm install -g typescript
```

### Install dependecy modules
```
npm install
```

### Run application
```
npm start
```

This must run the application at 3080 port (http://localhost:3080)

## Endpoints

### User login
Validates user credentials against database and returns user on successful validation otherwise error message.
```
POST - http://localhost:3080/wallet/user/login
```

### Get users
Returns the user information if provided the optional path parameter (userId) otherwise returns all the users
```
GET - http://localhost:3080/wallet/users/:userId?
```

### Make transaction
Allows to make a transaction. Valid payload is required.
```
POST - http://localhost:3080/wallet/transaction
```

### Get all transactions
Returns user's transactions if provided the optional paramter (userId) otherwise returns all the transactions.
```
GET - http://localhost:3080/wallet/transactions/:userId?
```

## Database
This repo connects to the Mongo DB Cloud. Credentials provided in the below file.
```
./src/config/config.ts
```
