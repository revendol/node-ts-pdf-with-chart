import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {failure, success} from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
const {OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNPROCESSABLE_ENTITY} = StatusCodes;
import PDFService from "@services/PDFService";
import template from "@views/pdf/template";
class PDFController {
    async generate(req: Request, res: Response){
        try {
            const data = {
                domain: "TRUSTTHEADDATA.NET",
                totalKeywords: 15,
                firstPageRanking: 5,
                secondPageRanking: 5,
                improvedRanking: 5,
                currentDate: "Jul 01, 2024",
                previousDate: "Jun 01, 2024",
                keywords: [
                    {
                        keyword: "keyword 1",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: "+ 100"
                    },
                    {
                        keyword: "keyword 2",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: "+ 100"
                    },
                    {
                        keyword: "keyword 3",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: "+ 100"
                    },
                    {
                        keyword: "keyword 4",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: "+ 100"
                    },
                    {
                        keyword: "keyword 5",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: "+ 100"
                    }
                ],
                improvedKeywords: [
                    {
                        keyword: "keyword 6",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: 100
                    },
                    {
                        keyword: "keyword 7",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: 100
                    },
                    {
                        keyword: "keyword 8",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: 100
                    },
                    {
                        keyword: "keyword 9",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: 100
                    },
                    {
                        keyword: "keyword 10",
                        currentRanking: 1,
                        previousRanking: 1,
                        beforeSeoRanking: "Not in top 100",
                        beforeSeoRankingChange: 100
                    }
                ],
                chartData: {
                    rankings: [12.5, 15, 12, 5, 6, 7, 7, 7, 6, 5, 7.5, 7.5],
                    xAxisData: ["Jan-24","Feb-24","Mar-24","Apr-24","May-24","Jun-24","Jul-24","Aug-24","Sep-24","Oct-24","Nov-24","Dec-24"]
                }
            };
            const pdfBuffer = await PDFService.generatePdf(template(data));
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
            return res.status(OK).send(pdfBuffer);
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send(failure({message : ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors : err}));
        }
    }
}

export default new PDFController();