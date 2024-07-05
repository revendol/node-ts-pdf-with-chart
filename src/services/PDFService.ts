import puppeteer from 'puppeteer';
import Validator, {ValidationErrors} from 'validatorjs';
class PDFService {
    public async generatePdf(htmlContent: string): Promise<Buffer> {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        //await page.waitForTimeout(5000); // Ensure chart is rendered
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();
        return pdfBuffer;
    }
    public validateRequest(data: any): {valid: boolean; message?: ValidationErrors} {
        const validate = new Validator(data, {
            domain: ['required', "regex:/^[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,}(\\/[a-zA-Z0-9-._~:/?#[\\]@!$&'()*+,;=]*)?$/"],
            "tracking.*.keyword": 'required|string',
            "tracking.*.rankings": 'required|array',
        });
        if(validate.fails()) {
            return { valid: false, message: validate.errors.errors };
        }
        return { valid: true };
    }
}

export default new PDFService();