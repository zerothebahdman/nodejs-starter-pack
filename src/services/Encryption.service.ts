import bcrypt from 'bcrypt';
import { createHash } from 'node:crypto';

export default class EncryptionService {
  async hashPassword(password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, 14);
    return encryptedPassword;
  }

  async comparePassword(
    password: string,
    storedPassword: string
  ): Promise<boolean> {
    const _checkPassword = await bcrypt.compare(storedPassword, password);
    return _checkPassword;
  }

  async hashString(string: string): Promise<string> {
    const hashedString = createHash('sha512').update(string).digest('hex');
    return hashedString;
  }
}
