class HelperFunctions{
    static convertDateToMonthYear(dateString: string): string {
      const date = new Date(eval(dateString));
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear().toString().slice(-2);
      return `${month}-${year}`;
    }
    static formatCurrentAndPrevDate(): { currentDate: string; previousDate: string } {
      const currentDate = new Date();
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const previousDate = new Date();
      previousDate.setDate(previousDate.getDate() - 30);
      const prevMonth = previousDate.toLocaleString('default', { month: 'short' });
      return {
        currentDate: `${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`,
        previousDate: `${prevMonth} ${previousDate.getDate()}, ${previousDate.getFullYear()}`
      };
    }
}
export default HelperFunctions;