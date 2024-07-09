import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {failure} from "@shared/response";
import ErrorMessage from "@shared/errorMessage";
const {OK, INTERNAL_SERVER_ERROR, BAD_REQUEST} = StatusCodes;
import PDFService from "@services/PDFService";
import template from "@views/pdf/index";
import HelperFunctions from "@util/HelperFunctions";
import {Keyword, DateValuePair, Data, Tracking, InputData} from "../types/Controller/PDF";

class PDFController {
  async generate(req: Request, res: Response) {
    try {
      const body = req.body as InputData;
      const validate = PDFService.validateRequest(body);
      if (!validate.valid) {
        return res
          .status(BAD_REQUEST)
          .send(failure({
            message: ErrorMessage.HTTP_BAD_REQUEST,
            errors: validate.message
          }));
      }
      const keywords: Keyword[] = [];
      let xAxis: string[] = [];
      body.tracking.forEach((item: Tracking) => {
        const axis = item.rankings.map(
          (rank: DateValuePair) =>
            HelperFunctions.convertDateToMonthYear(rank[0])
        );
        //Set xAxis to the longest array
        if (axis.length > xAxis.length) xAxis = axis;
        //Process ranking data
        const rakingData = PDFService.rankingsData(item.rankings);
        keywords.push({
          keyword: `${item.keyword} (${item.trackingType})`,
          currentRanking: rakingData.currentRanking ?? 'N/A',
          previousRanking: rakingData.previousData,
          initialRanking: rakingData.initialData,
          rankings: item.rankings.map((rank: DateValuePair) => rank[1] || 0)
        });
      });
      const dates = HelperFunctions.formatCurrentAndPrevDate(body.tracking[0].rankings);
      const data : Data = {
        domain: body.domain,
        totalKeywords: keywords.length || 0,
        improvedRanking: keywords.filter((k: Keyword) =>
          k.initialRanking.flag === "Improved").length || 0,
        currentDate: dates.currentDate,
        previousDate: dates.previousDate,
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
        .send(failure({message: ErrorMessage.HTTP_INTERNAL_SERVER_ERROR, errors: err}));
    }
  }
}

export default new PDFController();