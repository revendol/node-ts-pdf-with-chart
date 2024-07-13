import puppeteer from 'puppeteer';
import Validator from 'validatorjs';
import {
  ValidationResult,
  InputData,
  ImprovedRanking,
  Keyword,
  IChartAndTable,
  ISeries
} from "../types/Controller/PDF";
import HelperFunctions from "@util/HelperFunctions";
import {Data} from "../types/Controller/PDF";

class PDFService {
  public async generatePdf(htmlContent: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']
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
        'required', "regex:/^[a-zA-Z0-9-.]+" +
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
    currentRanking: number; previousData: ImprovedRanking; initialData: ImprovedRanking;
  } {
    const minMax = HelperFunctions.getMinMax(rankings);
    //Previous month ranking
    const pr = rankings[minMax.maxIndex - 1][1];
    const pc = pr - minMax.maxRanking;
    const previousData: ImprovedRanking = {
      flag: pc === 0 ? "Same" : pc > 0 ? "Improved" : "Decreased",
      value: pr > 100 && minMax.maxRanking <= 100 ? 'Not In Top 100' : pr,
      change: pc
    };
    //Initial ranking change
    const rankingChange = minMax.minRanking - minMax.maxRanking;
    const initialData: ImprovedRanking = {
      flag: rankingChange === 0 ? "Same" : rankingChange > 0 ? "Improved" : "Decreased",
      value: minMax.minRanking > 100 && minMax.maxRanking <= 100 ?
        'Not In Top 100' : minMax.minRanking,
      change: rankingChange
    };
    return {
      currentRanking: minMax.maxRanking, previousData, initialData
    };
  }

  public generateChartAndTable(data: Data): IChartAndTable[] {
    const chartAndTable: IChartAndTable[] = [];
    const locationIcon = `<img 
    src="https://i.ibb.co/64FrgR0/placeholder.png" 
    alt="placeholder" 
    style="width: 15px; height: 15px;margin-right: 10px;"
    border="0" />`;
    const topArrowIcon = `<img 
    src="https://i.ibb.co/YRfmbcj/top-up.png" 
    style="width: 15px; height: 15px;margin-right: 10px;"
    alt="top-up" 
    border="0">`;
    const downArrowIcon = `<img 
    src="https://i.ibb.co/FhWn9pt/down.png" 
    style="width: 15px; height: 15px;margin-right: 10px;"
    alt="down" 
    border="0">`;
    //For each five keywords, create a new chart
    for (let i = 0; i < data.keywords.length; i += 5) {
      const keywords = data.keywords.slice(i, i + 5);
      const chartData: ISeries[] = [];
      let table = '';
      keywords.forEach((keyword: Keyword) => {
        chartData.push({
          label: keyword.keyword, data: keyword.rankings, pointRadius: 5, lineTension: 0.5,
        });
        table += `<tr>
        <td style="text-align: left;">
          ${keyword.keyword}
        </td>
        <td>
          <p class="current-ranking">
             ${locationIcon}
             <span>
                ${keyword.currentRanking}
             </span>
          </p>
        </td>
        <td>
            <p class="previous-ranking">
                ${keyword.previousRanking.flag === "Same" ? 
    locationIcon : keyword.previousRanking.flag === "Improved" ? 
      topArrowIcon : downArrowIcon}
                <span>
                    ${keyword.previousRanking.value}
                </span>
                ${keyword.previousRanking.flag === "Improved" ? 
    `<span class="ranking-change improve">
    ${keyword.previousRanking.change > 0 ? 
    `+ ${keyword.previousRanking.change}` : keyword.previousRanking.change}
    </span>` : keyword.previousRanking.flag === "Decreased" ? 
      `<span class="ranking-change decrease">
        ${keyword.previousRanking.change > 0 ? 
    `+ ${keyword.previousRanking.change}` : keyword.previousRanking.change}
    </span>` : ''}
            </p>
        </td>
        <td>
            <p class="ranking-change-wrapper"> 
                ${keyword.initialRanking.flag === "Same" ? 
    locationIcon : keyword.initialRanking.flag === "Improved" ? 
      topArrowIcon : downArrowIcon}
                <span>
                    ${keyword.initialRanking.value}
                </span>
                ${keyword.initialRanking.flag === "Improved" ? 
    `<span class="ranking-change improve">
        ${keyword.initialRanking.change > 0 ? 
    `+ ${keyword.initialRanking.change}` : keyword.initialRanking.change}
    </span>` : keyword.initialRanking.flag === "Decreased" ? `<span class="ranking-change decrease">
        ${keyword.initialRanking.change > 0 ? 
    `+ ${keyword.initialRanking.change}` : keyword.initialRanking.change}
    </span>` : ''}
            </p>
        </td>
    </tr>`;
      });
      chartAndTable.push({
        table: table, chart: chartData
      });
    }
    return chartAndTable;
  }
}

export default new PDFService();