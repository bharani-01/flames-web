/**
 * FLAMES Calculator Module
 * FLAMES stands for: Friends, Lovers, Affection, Marriage, Enemies, Siblings
 */

class FlamesCalculator {
  constructor() {
    this.flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    this.flamesFullForm = {
      'F': 'Friends',
      'L': 'Lovers',
      'A': 'Affection',
      'M': 'Marriage',
      'E': 'Enemies',
      'S': 'Siblings'
    };
  }

  /**
   * Remove spaces and convert to lowercase
   */
  cleanName(name) {
    return name.toLowerCase().replace(/\s+/g, '');
  }

  /**
   * Remove common characters from both names
   */
  removeCommonCharacters(name1, name2) {
    let arr1 = name1.split('');
    let arr2 = name2.split('');

    // Remove common characters
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          arr1[i] = '';
          arr2[j] = '';
          break;
        }
      }
    }

    // Filter out empty strings
    arr1 = arr1.filter(char => char !== '');
    arr2 = arr2.filter(char => char !== '');

    return { arr1, arr2 };
  }

  /**
   * Calculate FLAMES result
   */
  calculate(name1, name2) {
    // Validate input
    if (!name1 || !name2) {
      throw new Error('Both names are required');
    }

    // Clean names
    const cleanName1 = this.cleanName(name1);
    const cleanName2 = this.cleanName(name2);

    if (cleanName1 === '' || cleanName2 === '') {
      throw new Error('Names cannot be empty');
    }

    // Remove common characters
    const { arr1, arr2 } = this.removeCommonCharacters(cleanName1, cleanName2);

    // Total count of remaining characters
    const count = arr1.length + arr2.length;

    if (count === 0) {
      throw new Error('Names are identical');
    }

    // FLAMES algorithm
    let flames = [...this.flames];
    let index = 0;

    while (flames.length > 1) {
      // Calculate the index to remove
      index = (index + count - 1) % flames.length;
      // Remove the character at that index
      flames.splice(index, 1);
    }

    const result = flames[0];

    return {
      name1: name1,
      name2: name2,
      remainingCount: count,
      result: result,
      relationship: this.flamesFullForm[result]
    };
  }
}

module.exports = FlamesCalculator;
