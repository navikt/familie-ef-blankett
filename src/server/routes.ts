import express, { Request, Response } from 'express';
import { IDokumentData } from '../typer/dokumentApi';
import hentDokumentHtml from './hentDokumentHtml';
import { genererPdf } from './utils/api';
import { logError, logSecure } from '@navikt/familie-logging';

import fs from 'fs';
const { NODE_ENV } = process.env;

const router = express.Router();

router.get('/status', (_, res) => {
  res.status(200).end();
});

router.post('/html', async (req: Request, res: Response) => {
  const dokument: IDokumentData = req.body as IDokumentData;

  try {
    const html = await hentDokumentHtml(dokument);
    res.send(html);
  } catch (feil) {
    logError(`Generering av dokument (html) feilet: Sjekk secure-logs `);
    loggFeilMedDataTilSecurelog<IDokumentData>(dokument, req, feil);
    return res.status(500).send(`Generering av dokument (html) feilet: ${feil.message}`);
  }
});

router.post('/pdf', async (req: Request, res: Response) => {
  const dokument: IDokumentData = req.body as IDokumentData;

  try {
    const html = await hentDokumentHtml(dokument);
    const pdf = await genererPdf(html);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=saksbehandlingsblankett.pdf`);
    res.end(pdf);
  } catch (feil) {
    logError(`Generering av dokument (pdf) feilet: Sjekk secure-logs`);
    loggFeilMedDataTilSecurelog<IDokumentData>(dokument, req, feil);

    return res.status(500).send(`Generering av dokument (pdf) feilet: ${feil.message}`);
  }
});
if (NODE_ENV !== 'production') {
  const lesMockFil = () => {
    const fileString = fs.readFileSync('./src/server/mock/dummydata.json', 'UTF-8');
    return JSON.parse(fileString);
  };

  router.post('/dummy-pdf', async (_req: Request, res: Response) => {
    try {
      const html = await hentDokumentHtml(lesMockFil());
      const pdf = await genererPdf(html);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=saksbehandlingsblankett.pdf`);
      res.end(pdf);
    } catch (feil) {
      return res.status(500).send(`Generering av dokument (pdf) feilet: ${feil.message}`);
    }
  });

  router.post('/dummy-html', async (_req: Request, res: Response) => {
    try {
      const html = await hentDokumentHtml(lesMockFil());
      res.send(html);
    } catch (feil) {
      return res.status(500).send(`Generering av dokument (pdf) feilet: ${feil.message}`);
    }
  });
}
const loggFeilMedDataTilSecurelog = <T>(data: T, req: Request, feil: Error) => {
  logSecure(
    `[${req.method} - ${
      req.originalUrl
    }] Genererer saksbehandlingsblankett med request-data feilet med feil=${feil.message}-${
      feil.stack
    } med data: ${JSON.stringify(data)}.`,
  );
};

export default router;
