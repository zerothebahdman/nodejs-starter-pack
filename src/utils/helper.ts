import { nanoid } from 'nanoid';

export default class HelperClass {
  static titleCase(string: string): string {
    let sentence = string.toLowerCase().split(' ');
    sentence = sentence.filter((str) => str.trim().length > 0);
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
  }

  static upperCase(string: string): string {
    let sentence = string.toUpperCase().split(' ');
    sentence = sentence.filter((str) => str.trim().length > 0);
    return sentence.join(' ');
  }

  static capitalCase(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  /**
   * Generate random characters with specified length
   * @param {Int16Array} length
   * @param {string} type e.g "num" - Numbers only, "alpha" - letters only (upper & lower), "upper" - Uppercase letters only, "lower" - Lowercase letters only, "upper-num" - A mix of uppercase letters & number, "lower-num" - A mix of lowecase letters and numbers, "alpha-num" - A mix of letters and numbers
   * @returns {string} e.g 'som3RandomStr1ng';
   */
  static generateRandomChar({
    length = 32,
    type = 'alpha-num',
  }: { length?: number; type?: string } = {}): string {
    // "num", "upper", "lower", "upper-num", "lower-num", "alpha-num"
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (type === 'num') characters = '0123456789';
    if (type === 'upper-num')
      characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    if (type === 'lower-num')
      characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (type === 'upper') characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (type === 'lower') characters = 'abcdefghijklmnopqrstuvwxyz';
    if (type === 'alpha')
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
