import { Response } from 'express';
import { validationResult } from 'express-validator';
import { TransactionService } from '../services/transactionService';
import { ApiResponse, AppError } from '../utils/response';
import logger from '../config/logger';
import { AuthRequest } from '../middleware/auth';

export class TransactionController {
  /**
   * Get Transaction History
   */
  static async getTransactionHistory(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const result = await TransactionService.getTransactionHistory(userId, page, limit);

      return ApiResponse.paginated(
        res,
        result.transactions,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total,
        'Transaction history retrieved successfully'
      );
    } catch (error: any) {
      logger.error('Get transaction history error:', error);
      return ApiResponse.error(res, error.message || 'Get transaction history failed', error.statusCode || 500);
    }
  }

  /**
   * Get Transaction Details
   */
  static async getTransactionDetails(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      const { transactionId } = req.params;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const transaction = await TransactionService.getTransactionDetails(transactionId);

      // Verify user ownership
      if (transaction.userId !== userId) {
        throw new AppError('Unauthorized', 403);
      }

      return ApiResponse.success(res, transaction, 'Transaction details retrieved', 200);
    } catch (error: any) {
      logger.error('Get transaction details error:', error);
      return ApiResponse.error(res, error.message || 'Get transaction details failed', error.statusCode || 500);
    }
  }

  /**
   * Get Wallet Transactions
   */
  static async getWalletTransactions(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      const { walletId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const result = await TransactionService.getWalletTransactions(walletId, page, limit);

      return ApiResponse.paginated(
        res,
        result.transactions,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total,
        'Wallet transactions retrieved successfully'
      );
    } catch (error: any) {
      logger.error('Get wallet transactions error:', error);
      return ApiResponse.error(res, error.message || 'Get wallet transactions failed', error.statusCode || 500);
    }
  }
}