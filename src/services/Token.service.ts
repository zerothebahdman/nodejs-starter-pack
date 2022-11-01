import jwt from 'jsonwebtoken';
import { join } from 'path';
import log from '../logging/logger';
import config from '../../config/default';
import { readFile } from 'fs/promises';
import AppException from '../exceptions/AppException';
import { NextFunction } from 'express';
import { createHash, randomBytes } from 'node:crypto';
import httpStatus from 'http-status';

let PRIVATE_KEY: string = '';
(async () => {
  try {
    PRIVATE_KEY = await readFile(
      join(__dirname, '../certs/private_key.pem'),
      'utf8'
    );
  } catch (err: any) {
    log.error(err.message);
  }
})();

let PUBLIC_KEY: string = '';
(async () => {
  try {
    PUBLIC_KEY = await readFile(
      join(__dirname, '../certs/public_key.pem'),
      'utf8'
    );
  } catch (err: any) {
    log.error(err.message);
  }
})();

export default class TokenService {
  /**
   * @param uuid
   * @returns
   */
  async _generateAccessToken(id: string, name: string): Promise<string> {
    const token = jwt.sign({ sub: id, name, type: 'access' }, PRIVATE_KEY, {
      algorithm: 'RS512',
      expiresIn: config.jwtAccessTokenExpiration,
    });

    return token;
  }

  async _generateRefreshToken(id: string, name: string): Promise<string> {
    const token = jwt.sign({ sub: id, name, type: 'refresh' }, PRIVATE_KEY, {
      algorithm: 'RS512',
      expiresIn: config.jwtRefreshTokenExpiration,
    });

    return token;
  }

  /**
   * @param token refers to the token that you want to verify
   * @param next inbuilt middleware function
   * @returns
   */
  async verifyToken(token: string, next: NextFunction) {
    try {
      const _token = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS512'] });
      return _token;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError')
        next(
          new AppException(
            'Oops!, your token has expired.',
            httpStatus.UNAUTHORIZED
          )
        );
      if (err.name === 'JsonWebTokenError')
        next(
          new AppException(
            'Oops!, your token has expired.',
            httpStatus.UNAUTHORIZED
          )
        );
      return next(new AppException(err.status, err.message));
    }
  }

  /**Generate token that will be sent to the users email for verification
   * Generate random string using randomBytes from node crypto library
   */
  async TokenGenerator() {
    const Token = randomBytes(50).toString('hex');
    const hashedToken = createHash('sha512').update(Token).digest('hex');
    return { Token, hashedToken };
  }
}
