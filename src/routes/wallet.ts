import express from 'express';
import controller from '../controllers/wallet';
import userController from '../controllers/user';

const walletRouter = express.Router();

walletRouter.post('/wallet/user/login', userController.validateUserCredentials);

walletRouter.get('/wallet/users/:userId?', controller.getWalletUsers);

walletRouter.post('/wallet/transaction', controller.createWalletTransaction);

walletRouter.get('/wallet/transactions/:userId?', controller.getAllWalletTransactions);

export = walletRouter;
