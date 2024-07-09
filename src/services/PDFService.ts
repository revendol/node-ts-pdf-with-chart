import puppeteer from 'puppeteer';
import Validator from 'validatorjs';
import {ValidationResult, InputData, ImprovedRanking} from "../types/Controller/PDF";
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
    previousData: ImprovedRanking;
    initialData: ImprovedRanking;
  } {
    const minMax = HelperFunctions.getMinMax(rankings);
    //Previous month ranking
    const pr = rankings[minMax.maxIndex - 1][1];
    const pc = pr - minMax.maxRanking;
    const previousData : ImprovedRanking = {
      flag: pc===0 ? "Same" : pc > 0 ? "Improved" : "Decreased",
      value: pr > 100 && minMax.maxRanking <=100 ? 'Not In Top 100' : pr,
      change: pc
    };
    //Initial ranking change
    const rankingChange = minMax.minRanking - minMax.maxRanking;
    const initialData : ImprovedRanking = {
      flag: rankingChange===0 ? "Same" : rankingChange > 0 ? "Improved" : "Decreased",
      value: minMax.minRanking > 100 && minMax.maxRanking <=100 ?
        'Not In Top 100' : minMax.minRanking,
      change: rankingChange
    };
    return {
      currentRanking: minMax.maxRanking,
      previousData,
      initialData
    };
  }
}

export default new PDFService();