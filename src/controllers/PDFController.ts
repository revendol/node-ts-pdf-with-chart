import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {failure} from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
const {OK, INTERNAL_SERVER_ERROR, BAD_REQUEST} = StatusCodes;
import PDFService from "@services/PDFService";
import template from "@views/pdf/template";
import HelperFunctions from "@util/HelperFunctions";


type DateValuePair = [string, number];

interface Tracking {
  trackingType: string;
  local: boolean;
  keyword: string;
  rankings: DateValuePair[];
}

interface Data {
  domain: string;
  tracking: Tracking[];
}
interface Keyword {
  keyword: string;
  currentRanking: number | string;
  previousRanking: number | string;
  beforeSeoRanking: string;
  beforeSeoRankingChange: string,
  rankings: number[];
}

class PDFController {
    async generate(req: Request, res: Response){
        try {
            const validate = PDFService.validateRequest(req.body);
            if(!validate.valid){
                return res
                  .status(BAD_REQUEST)
                  .send(failure({
                      message: ErrorMessage.HTTP_BAD_REQUEST,
                      errors: validate.message
                  }));
            }
            const uniqueKeywords = new Set();
            let keywords : Keyword[] = [];
            let xAxis : string[] = [];

            req.body.tracking.forEach((item : any) => {
              uniqueKeywords.add(item.keyword);
              const axis = item.rankings.map((rank: DateValuePair) => HelperFunctions.convertDateToMonthYear(rank[0]));
              if(axis.length > xAxis.length) xAxis = axis;
              keywords.push({
                keyword: item.keyword,
                currentRanking: 'N/A',
                previousRanking:'N/A',
                beforeSeoRanking: "Not in top 100",
                beforeSeoRankingChange: "+ 100",
                rankings: item.rankings.map((rank: DateValuePair) => rank[1] || 0)
              })
            });
            let data = {
              domain: req.body.domain,
              totalKeywords: uniqueKeywords.size || 0,
              firstPageRanking: 0,
              secondPageRanking: 'N/A',
              improvedRanking: 'N/A',
              currentDate: HelperFunctions.formatCurrentAndPrevDate().currentDate,
              previousDate: HelperFunctions.formatCurrentAndPrevDate().previousDate,
              xAxis,
              keywords
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