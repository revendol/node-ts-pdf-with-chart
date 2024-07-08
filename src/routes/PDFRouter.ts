import { Router, Request, Response } from 'express';
import PDFController from "@controller/PDFController";

const router = Router();

export const p = {
  basePath: '/pdf',
  generate: '/generate'
} as const;

router.post(
  p.generate,
  (req: Request, res: Response) => PDFController.generate(req, res)
);

export default router;