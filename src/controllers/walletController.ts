import { Response } from 'express';
import { validationResult } from 'express-validator';
import { WalletService } from '../services/walletService';
import { ApiResponse, AppError } from '../utils/response';
import logger from '../config/logger';
import { AuthRequest } from '../middleware/auth';

export class WalletController {
  /**
   * Add Wallet
   */
  static async addWallet(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      const { walletAddress, walletType, chainNetwork } = req.body;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const wallet = await WalletService.addWallet(userId, walletAddress, walletType, chainNetwork);

      logger.info(`Wallet added for user: ${userId}`);

      return ApiResponse.success(res, wallet, 'Wallet added successfully', 201);
    } catch (error: any) {
      logger.error('Add wallet error:', error);
      return ApiResponse.error(res, error.message || 'Add wallet failed', error.statusCode || 500);
    }
  }

  /**
   * Get User Wallets
   */
  static async getUserWallets(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const wallets = await WalletService.getUserWallets(userId);

      return ApiResponse.success(res, wallets, 'Wallets retrieved successfully', 200);
    } catch (error: any) {
      logger.error('Get user wallets error:', error);
      return ApiResponse.error(res, error.message || 'Get wallets failed', error.statusCode || 500);
    }
  }

  /**
   * Get Wallet Details
   */
  static async getWalletDetails(req: AuthRequest, res: Response) {
    try {
      const { walletId } = req.params;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      // TODO: Add wallet retrieval logic with user verification
      return ApiResponse.success(res, null, 'Wallet details retrieved', 200);
    } catch (error: any) {
      logger.error('Get wallet details error:', error);
      return ApiResponse.error(res, error.message || 'Get wallet details failed', error.statusCode || 500);
    }
  }

  /**
   * Get Wallet Balance
   */
  static async getBalance(req: AuthRequest, res: Response) {
    try {
      const { walletId } = req.params;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      // TODO: Add balance retrieval logic
      return ApiResponse.success(res, null, 'Balance retrieved', 200);
    } catch (error: any) {
      logger.error('Get balance error:', error);
      return ApiResponse.error(res, error.message || 'Get balance failed', error.statusCode || 500);
    }
  }

  /**
   * Sync Balance
   */
  static async syncBalance(req: AuthRequest, res: Response) {
    try {
      const { walletId } = req.params;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const balance = await WalletService.syncWalletBalance(walletId);

      logger.info(`Wallet balance synced: ${walletId}`);

      return ApiResponse.success(res, balance, 'Balance synced successfully', 200);
    } catch (error: any) {
      logger.error('Sync balance error:', error);
      return ApiResponse.error(res, error.message || 'Sync balance failed', error.statusCode || 500);
    }
  }

  /**
   * Delete Wallet
   */
  static async deleteWallet(req: AuthRequest, res: Response) {
    try {
      const { walletId } = req.params;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const result = await WalletService.deleteWallet(userId, walletId);

      logger.info(`Wallet deleted: ${walletId}`);

      return ApiResponse.success(res, result, 'Wallet deleted successfully', 200);
    } catch (error: any) {
      logger.error('Delete wallet error:', error);
      return ApiResponse.error(res, error.message || 'Delete wallet failed', error.statusCode || 500);
    }
  }

  /**
   * Set Default Wallet
   */
  static async setDefaultWallet(req: AuthRequest, res: Response) {
    try {
      const { walletId } = req.params;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      // TODO: Add set default wallet logic
      return ApiResponse.success(res, null, 'Default wallet set successfully', 200);
    } catch (error: any) {
      logger.error('Set default wallet error:', error);
      return ApiResponse.error(res, error.message || 'Set default wallet failed', error.statusCode || 500);
    }
  }
}