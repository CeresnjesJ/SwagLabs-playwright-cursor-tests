export class TestHelper {
  /**
   * Parses a price string (e.g., "$29.99" or "Item total: $50.00") to a number
   * @param priceText - The price text to parse
   * @returns The numeric value of the price
   */
  static parsePriceToNumber(priceText: string): number {
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  /**
   * Converts a product name to a slug format (e.g., "Sauce Labs Backpack" -> "sauce-labs-backpack")
   * @param productName - The product name to convert
   * @returns The slug version of the product name
   */
  static convertProductNameToSlug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Sums an array of numbers
   * @param numbers - The array of numbers to sum
   * @returns The sum of all numbers in the array
   */
  static sumArray(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}
