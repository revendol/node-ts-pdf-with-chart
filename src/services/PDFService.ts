import puppeteer from 'puppeteer';

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
}

export default new PDFService();