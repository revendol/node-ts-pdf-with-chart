import {Router} from 'express';
import pdfRouter, {p as pdfPath} from './PDFRouter';

// Init
const apiRouter = Router();

/*================================================
 Add api routes
================================================*/
apiRouter.use(pdfPath.basePath, pdfRouter);

// **** Export default **** //

export default apiRouter;
