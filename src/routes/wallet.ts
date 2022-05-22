import express from 'express';
import controller from '../controllers/wallet';

const walletRouter = express.Router();

walletRouter.get('/wallet/users/:userId?', controller.getWalletUsers);

walletRouter.post('/wallet/transaction', controller.createWalletTransaction);

walletRouter.get('/wallet/transactions/:userId?', controller.getAllWalletTransactions);

export = walletRouter;
