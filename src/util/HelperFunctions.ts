class HelperFunctions {
  static convertDateToMonthYear(dateString: string): string {
    //Add 1 to month because months are 0-indexed
    let [, y, m, d] = dateString.match(/Date.UTC\((\d+),(\d+),(\d+)\)/) || [];
    const date = new Date(`${y}-${parseInt(m)+1}-${d}`);
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear().toString().slice(-2);
    return `${month}-${year}`;
  }

  static formatCurrentAndPrevDate(): { currentDate: string; previousDate: string } {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', {month: 'short'});
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 30);
    const prevMonth = previousDate.toLocaleString('default', {month: 'short'});
    return {
      currentDate: `${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`,
      previousDate: `${prevMonth} ${previousDate.getDate()}, ${previousDate.getFullYear()}`
    };
  }
  static formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${month} ${day} , ${year}`;
  }
  static getMinMax(data: [string, number][]): {
    minDate: Date | string;
    maxDate: Date | string;
    minRanking: number;
    maxRanking: number;
    maxIndex: number;
  } {
    if(data.length === 0) return { minDate: 'N/A', maxDate: 'N/A', maxRanking: 0, minRanking: 0, maxIndex: 0 };
    // Initialize variables for min and max dates
    let minDate: Date | null = null;
    let maxDate: Date | null = null;
    let minRanking = 0;
    let maxRanking = 0;
    let maxIndex = 0;
    // Iterate through the array to find min and max dates
    data.forEach(([dateString, _value], index) => {
      // Extract year, month, and day from the dateString
      const [, year, month, day] = dateString.match(/Date.UTC\((\d+),(\d+),(\d+)\)/) || [];

      if (year && month && day) {
        const date = new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(day)));

        // Update minDate and maxDate
        if (!minDate || date < minDate) {
          minDate = date;
          minRanking = _value;
        }
        if (!maxDate || date > maxDate) {
          maxDate = date;
          maxRanking = _value;
          maxIndex = index;
        }
      }
    });
    // Return the result as Date objects
    return {
      minDate: this.formatDate(minDate!),
      maxDate: this.formatDate(maxDate!),
      minRanking, maxRanking, maxIndex
    };
  }
}

export default HelperFunctions;