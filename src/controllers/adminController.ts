import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AdminService } from '../services/adminService';
import { ApiResponse, AppError } from '../utils/response';
import logger from '../config/logger';
import { AuthRequest } from '../middleware/auth';

export class AdminController {
  /**
   * Get Dashboard Statistics
   */
  static async getDashboardStats(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const stats = await AdminService.getDashboardStats();

      return ApiResponse.success(res, stats, 'Dashboard statistics retrieved', 200);
    } catch (error: any) {
      logger.error('Get dashboard stats error:', error);
      return ApiResponse.error(res, error.message || 'Get dashboard stats failed', error.statusCode || 500);
    }
  }

  /**
   * Get All Users
   */
  static async getAllUsers(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await AdminService.getAllUsers(page, limit);

      return ApiResponse.paginated(
        res,
        result.users,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total,
        'Users retrieved successfully'
      );
    } catch (error: any) {
      logger.error('Get all users error:', error);
      return ApiResponse.error(res, error.message || 'Get all users failed', error.statusCode || 500);
    }
  }

  /**
   * Get User Details
   */
  static async getUserDetails(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      // TODO: Implement get user details
      return ApiResponse.success(res, null, 'User details retrieved', 200);
    } catch (error: any) {
      logger.error('Get user details error:', error);
      return ApiResponse.error(res, error.message || 'Get user details failed', error.statusCode || 500);
    }
  }

  /**
   * Toggle User Status
   */
  static async toggleUserStatus(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const { userId } = req.params;
      const { isActive } = req.body;

      const user = await AdminService.toggleUserStatus(userId, isActive);

      logger.info(`User status toggled by admin: ${userId}`);

      return ApiResponse.success(res, user, 'User status updated successfully', 200);
    } catch (error: any) {
      logger.error('Toggle user status error:', error);
      return ApiResponse.error(res, error.message || 'Toggle user status failed', error.statusCode || 500);
    }
  }

  /**
   * Blacklist User
   */
  static async blacklistUser(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const { userId } = req.params;

      const user = await AdminService.blacklistUser(userId, req.adminId);

      logger.info(`User blacklisted by admin: ${userId}`);

      return ApiResponse.success(res, user, 'User blacklisted successfully', 200);
    } catch (error: any) {
      logger.error('Blacklist user error:', error);
      return ApiResponse.error(res, error.message || 'Blacklist user failed', error.statusCode || 500);
    }
  }

  /**
   * Get All Transactions
   */
  static async getAllTransactions(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const filters = req.query.filters ? JSON.parse(req.query.filters as string) : {};

      const result = await AdminService.getAllTransactions(page, limit, filters);

      return ApiResponse.paginated(
        res,
        result.transactions,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total,
        'Transactions retrieved successfully'
      );
    } catch (error: any) {
      logger.error('Get all transactions error:', error);
      return ApiResponse.error(res, error.message || 'Get all transactions failed', error.statusCode || 500);
    }
  }

  /**
   * Get Transaction Details
   */
  static async getTransactionDetails(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const { transactionId } = req.params;

      const transaction = await AdminService.getTransactionDetails(transactionId);

      return ApiResponse.success(res, transaction, 'Transaction details retrieved', 200);
    } catch (error: any) {
      logger.error('Get transaction details error:', error);
      return ApiResponse.error(res, error.message || 'Get transaction details failed', error.statusCode || 500);
    }
  }

  /**
   * Update Transaction Status
   */
  static async updateTransactionStatus(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const { transactionId } = req.params;
      const { status } = req.body;

      const transaction = await AdminService.getTransactionDetails(transactionId);

      // TODO: Update transaction status in blockchain and database
      logger.info(`Transaction status updated by admin: ${transactionId}`);

      return ApiResponse.success(res, transaction, 'Transaction status updated successfully', 200);
    } catch (error: any) {
      logger.error('Update transaction status error:', error);
      return ApiResponse.error(res, error.message || 'Update transaction status failed', error.statusCode || 500);
    }
  }

  /**
   * Get Admin Logs
   */
  static async getAdminLogs(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await AdminService.getAdminLogs(page, limit);

      return ApiResponse.paginated(
        res,
        result.logs,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total,
        'Admin logs retrieved successfully'
      );
    } catch (error: any) {
      logger.error('Get admin logs error:', error);
      return ApiResponse.error(res, error.message || 'Get admin logs failed', error.statusCode || 500);
    }
  }

  /**
   * Get Security Audit Logs
   */
  static async getSecurityAuditLogs(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await AdminService.getSecurityAuditLogs(page, limit);

      return ApiResponse.paginated(
        res,
        result.logs,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total,
        'Security audit logs retrieved successfully'
      );
    } catch (error: any) {
      logger.error('Get security audit logs error:', error);
      return ApiResponse.error(res, error.message || 'Get security audit logs failed', error.statusCode || 500);
    }
  }

  /**
   * Get Platform Settings
   */
  static async getPlatformSettings(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      // TODO: Implement get platform settings
      return ApiResponse.success(res, {}, 'Platform settings retrieved', 200);
    } catch (error: any) {
      logger.error('Get platform settings error:', error);
      return ApiResponse.error(res, error.message || 'Get platform settings failed', error.statusCode || 500);
    }
  }

  /**
   * Update Platform Setting
   */
  static async updatePlatformSetting(req: AuthRequest, res: Response) {
    try {
      if (!req.adminId) {
        throw new AppError('Admin not authenticated', 401);
      }

      // TODO: Implement update platform setting
      return ApiResponse.success(res, {}, 'Platform setting updated successfully', 200);
    } catch (error: any) {
      logger.error('Update platform setting error:', error);
      return ApiResponse.error(res, error.message || 'Update platform setting failed', error.statusCode || 500);
    }
  }
}