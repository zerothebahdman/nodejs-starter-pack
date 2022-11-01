import bcrypt from 'bcrypt';

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
}
