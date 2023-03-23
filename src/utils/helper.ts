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

  static generateRandomChar(length = 32, type = 'alpha-num'): string {
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

  static userNameValidator(string: string) {
    /**
     * Ensure it only starts with alphabets, can have numbers and can only contain '-', '_' special characters.
     */
    const strongRegex = new RegExp(/^[ A-Za-z0-9_-]*$/);
    if (!strongRegex.test(string)) {
      throw new Error(
        'Invalid character in username. Only hiphen (-) and underscore (_) are allowed'
      );
    }
  }
  static removeUnwantedProperties(object: unknown, properties: string[]) {
    let newObject: { [key: string]: string } = {};
    if (typeof object === 'object' && object !== null) {
      newObject = { ...object };
      properties.forEach((property) => {
        delete newObject[property];
      });
    }
    return newObject;
  }
}
