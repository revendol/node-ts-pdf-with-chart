import { Router } from 'express';
import PDFController from "@controller/PDFController";

const router = Router();

export const p = {
    basePath: '/pdf',
    generate: '/generate'
} as const;

router.post(
    p.generate,
    PDFController.generate
);

export default router;