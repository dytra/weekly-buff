import { getTotalWeekPassed } from "../lib/utils";

describe('getTotalWeekPassed', () => {
  it('should return the correct number of weeks passed', () => {
    // Arrange
    const initialDate = new Date('2023-01-01'); // Replace with your desired initial date
    const currentDate = new Date('2023-01-15'); // Replace with your desired current date

    // Act
    const result = getTotalWeekPassed(initialDate, currentDate);

    // Assert
    expect(result).toEqual(2); // Adjust the expected value based on your specific dates and calculation
  });

  it('should return 0 weeks when it is less than a week', () => {
    // Arrange
    const initialDate = new Date('2023-01-01'); // Replace with your desired initial date
    const currentDate = new Date('2023-01-06'); // Replace with your desired current date

    // Act
    const result = getTotalWeekPassed(initialDate, currentDate);

    // Assert
    expect(result).toEqual(0); // Adjust the expected value based on your specific dates and calculation
  });

  it('should handle negative time differences and return 0 weeks passed', () => {
    // Arrange
    const initialDate = new Date('2023-01-15'); // Replace with a later date
    const currentDate = new Date('2023-01-01'); // Replace with an earlier date

    // Act
    const result = getTotalWeekPassed(initialDate, currentDate);

    // Assert
    expect(result).toEqual(0);
  });
});