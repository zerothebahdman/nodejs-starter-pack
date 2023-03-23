/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { join } from 'path';
import log from '../logging/logger';
import config from '../../config/default';
import { readFile } from 'fs/promises';
import { createHash } from 'node:crypto';
import HelperClass from '../utils/helper';

let PRIVATE_KEY = '';
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

let PUBLIC_KEY = '';
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
  private async _generateAccessToken(
    id: string | number,
    name: string
  ): Promise<string> {
    const token = jwt.sign({ sub: id, name, type: 'access' }, PRIVATE_KEY, {
      algorithm: 'RS512',
      expiresIn: config.jwtAccessTokenExpiration,
    });

    return token;
  }

  private async _generateRefreshToken(
    id: string | number,
    name: string
  ): Promise<string> {
    const token = jwt.sign({ sub: id, name, type: 'refresh' }, PRIVATE_KEY, {
      algorithm: 'RS512',
      expiresIn: config.jwtRefreshTokenExpiration,
    });

    return token;
  }

  async generateToken(
    id: string | number,
    name: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this._generateAccessToken(id, name);
    const refreshToken = await this._generateRefreshToken(id, name);
    return { accessToken, refreshToken };
  }

  /**
   * @param token refers to the token that you want to verify
   * @param next inbuilt middleware function
   * @returns
   */
  async verifyToken(token: string): Promise<string | jwt.JwtPayload> {
    try {
      const _token = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS512'] });
      return _token;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')
        throw new Error(`Oops! your token has expired or is invalid`);
      throw new Error(err.message);
    }
  }

  /**Generate token that will be sent to the users email for verification
   * Generate random string using randomBytes from node crypto library
   */
  async TokenGenerator() {
    const Token = HelperClass.generateRandomChar(50, 'lower-num');
    const hashedToken = createHash('sha512').update(Token).digest('hex');
    return { Token, hashedToken };
  }
}
