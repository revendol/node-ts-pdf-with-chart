import puppeteer from 'puppeteer';
import Validator from 'validatorjs';
import {ValidationResult, InputData} from "../types/Controller/PDF";
import HelperFunctions from "@util/HelperFunctions";

class PDFService {
  public async generatePdf(htmlContent: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil: 'networkidle0'});
    //await page.waitForTimeout(5000); // Ensure chart is rendered
    const pdfBuffer = await page.pdf({format: 'A4', printBackground: true});
    await browser.close();
    return pdfBuffer;
  }

  public validateRequest(data: InputData): ValidationResult {
    const validate = new Validator(data, {
      domain: [
        'required',
        "regex:/^[a-zA-Z0-9-.]+" +
        "\\.[a-zA-Z]{2,}(\\/[a-zA-Z0-9-._~" +
        ":/?#[\\]@!$&'()*+,;=]*)?$/"],
      "tracking.*.keyword": 'required|string',
      "tracking.*.rankings": 'required|array',
    });
    if (validate.fails()) {
      return {valid: false, message: validate.errors.errors};
    }
    return {valid: true};
  }
  public rankingsData(rankings: [string, number][]): {
    currentRanking: number;
    previousRanking: number;
    rankingChange: number;
    improvedRanking: number;
    previousDate: string;
  } {
    const minMax = HelperFunctions.getMinMax(rankings);
    let [, y, m, d] = rankings[minMax.maxIndex - 1][0].match(/Date.UTC\((\d+),(\d+),(\d+)\)/) || [];
    let previousDate : Date | string = new Date(`${y}-${parseInt(m)+1}-${d}`);
    const prevMonth = previousDate.toLocaleString('default', {month: 'short'});
    previousDate = `${prevMonth} ${previousDate.getDate()}, ${previousDate.getFullYear().toString().slice(-2)}`;
    //Current ranking
    const currentRanking = minMax.maxRanking;
    //Previous month ranking
    const previousRanking = rankings[minMax.maxIndex - 1][1];
    //Ranking change between current and previous month
    const rankingChange = currentRanking - previousRanking;
    //Ranking change between current month and very first month
    const improvedRanking = minMax.maxRanking - minMax.minRanking;
    return {currentRanking, previousRanking, rankingChange, improvedRanking, previousDate};
  }
}

export default new PDFService();