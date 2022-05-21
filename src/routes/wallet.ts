import express from 'express';
import controller from '../controllers/wallet';

const walletRouter = express.Router();

walletRouter.get('/users/:userId?', controller.getUsers);

walletRouter.post('/transaction', controller.createWalletTransaction);

walletRouter.get('/transactions/:userId?', controller.getAllWalletTransactions);

export = walletRouter;
