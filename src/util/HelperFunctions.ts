import {DateValuePair} from "../types/Controller/PDF";

class HelperFunctions {
  static convertDateToMonthYear(dateString: string): string {
    //Add 1 to month because months are 0-indexed
    const [, y, m, d] = dateString.match(/Date.UTC\((\d+),(\d+),(\d+)\)/) || [];
    const date = new Date(`${y}-${parseInt(m)+1}-${d}`);
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear().toString().slice(-2);
    return `${month}-${year}`;
  }

  static formatCurrentAndPrevDate(rankings: DateValuePair[]): {
    currentDate: string;
    previousDate: string
  } {
    const minMax = this.getMinMax(rankings);
    const currentDate = new Date(minMax.maxDate);
    const month = currentDate.toLocaleString('default', {month: 'short'});
    const [, y, m, d] = rankings[minMax.maxIndex - 1][0]
      .match(/Date.UTC\((\d+),(\d+),(\d+)\)/) || [];
    const previousDate : Date | string = new Date(`${y}-${parseInt(m)+1}-${d}`);
    const prevMonth = previousDate.toLocaleString('default', {month: 'short'});
    return {
      currentDate: `${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`,
      previousDate: `${prevMonth} ${previousDate.getDate()}, ${previousDate.getFullYear()}`
    };
  }
  static formatDate(date: Date): string {
    const day = ('0' + date.getDate().toString()).slice(-2);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${month} ${day} , ${year}`;
  }
  static getMinMax(data: DateValuePair[]): {
    minDate: Date | string;
    maxDate: Date | string;
    minRanking: number;
    maxRanking: number;
    maxIndex: number;
  } {
    if(data.length === 0) return {
      minDate: 'N/A',
      maxDate: 'N/A',
      maxRanking: 0,
      minRanking: 0,
      maxIndex: 0
    };
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
      minDate: this.formatDate(minDate ?? new Date()),
      maxDate: this.formatDate(maxDate ?? new Date()),
      minRanking, maxRanking, maxIndex
    };
  }
}

export default HelperFunctions;