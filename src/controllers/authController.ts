import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
import { ApiResponse, AppError } from '../utils/response';
import { validateEmail, validatePassword } from '../utils/validators';
import logger from '../config/logger';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  /**
   * User Registration
   */
  static async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      const { email, password, walletAddress } = req.body;

      // Validate email
      if (!validateEmail(email)) {
        throw new AppError('Invalid email format', 400);
      }

      // Validate password strength
      if (!validatePassword(password)) {
        throw new AppError('Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character', 400);
      }

      // Register user
      const result = await AuthService.registerUser(email, password, walletAddress);

      logger.info(`User registered: ${result.user.id}`);

      return ApiResponse.success(res, result, 'User registered successfully', 201);
    } catch (error: any) {
      logger.error('Registration error:', error);
      return ApiResponse.error(res, error.message || 'Registration failed', error.statusCode || 500);
    }
  }

  /**
   * User Login
   */
  static async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.error(res, 'Validation failed', 400, errors.array());
      }

      const { email, password } = req.body;

      // Login user
      const result = await AuthService.loginUser(email, password);

      logger.info(`User logged in: ${result.user.id}`);

      return ApiResponse.success(res, result, 'Login successful', 200);
    } catch (error: any) {
      logger.error('Login error:', error);
      return ApiResponse.error(res, error.message || 'Login failed', 401);
    }
  }

  /**
   * Change Password
   */
  static async changePassword(req: AuthRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.userId;

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      if (!currentPassword || !newPassword) {
        throw new AppError('Current password and new password are required', 400);
      }

      const result = await AuthService.changePassword(userId, currentPassword, newPassword);

      logger.info(`Password changed for user: ${userId}`);

      return ApiResponse.success(res, result, 'Password changed successfully', 200);
    } catch (error: any) {
      logger.error('Change password error:', error);
      return ApiResponse.error(res, error.message || 'Change password failed', error.statusCode || 500);
    }
  }

  /**
   * Verify Token
   */
  static async verifyToken(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        throw new AppError('Invalid token', 401);
      }

      return ApiResponse.success(res, { userId: req.userId }, 'Token is valid', 200);
    } catch (error: any) {
      logger.error('Token verification error:', error);
      return ApiResponse.error(res, error.message || 'Token verification failed', 401);
    }
  }
}