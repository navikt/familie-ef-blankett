import express, { Request, Response } from 'express';
import { IDokumentData } from '../typer/dokumentApi';
import hentDokumentHtml from './hentDokumentHtml';
import { genererPdf } from './utils/api';
import { logError, logSecure } from '@navikt/familie-logging';

import fs from 'fs';
import { genererMetadata } from './utils/logging';
import genererKlageDokumentHtml from './genererKlageDokumentHtml';
import { IKlageDokumentData } from '../typer/klageDokumentApi';

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
    const error = feil as Error;
    logError(
      `Generering av dokument (html) feilet: Sjekk secure-logs`,
      undefined,
      genererMetadata(req),
    );
    loggFeilMedDataTilSecurelog<IDokumentData>(dokument, req, error);
    return res.status(500).send(`Generering av dokument (html) feilet: ${error.message}`);
  }
});

router.post('/pdf', async (req: Request, res: Response) => {
  const dokument: IDokumentData = req.body as IDokumentData;
  const meta = genererMetadata(req);
  try {
    const html = await hentDokumentHtml(dokument);
    const pdf = await genererPdf(html, meta);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=saksbehandlingsblankett.pdf`);
    res.end(pdf);
  } catch (feil) {
    const error = feil as Error;
    logError(`Generering av dokument (pdf) feilet: Sjekk secure-logs`, undefined, meta);
    loggFeilMedDataTilSecurelog<IDokumentData>(dokument, req, error);

    return res.status(500).send(`Generering av dokument (pdf) feilet: ${error.message}`);
  }
});

router.post('/klage/pdf', async (req: Request, res: Response) => {
  const dokument: IKlageDokumentData = req.body as IKlageDokumentData;
  const meta = genererMetadata(req);
  try {
    const html = await genererKlageDokumentHtml(dokument);
    const pdf = await genererPdf(html, meta);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=klagesaksbehandlingsblankett.pdf`);
    res.end(pdf);
  } catch (feil) {
    const error = feil as Error;
    logError(`Generering av klagedokument (pdf) feilet: Sjekk secure-logs`, undefined, meta);
    loggFeilMedDataTilSecurelog<IKlageDokumentData>(dokument, req, error);

    return res.status(500).send(`Generering av dokument (pdf) feilet: ${error.message}`);
  }
});

if (NODE_ENV !== 'production') {
  const lesMockFil = () => {
    const fileString = fs.readFileSync('./src/server/mock/dummydata.json', { encoding: 'utf-8' });
    return JSON.parse(fileString);
  };

  router.post('/dummy-pdf', async (_req: Request, res: Response) => {
    try {
      const html = await hentDokumentHtml(lesMockFil());
      const pdf = await genererPdf(html, genererMetadata(_req));
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=saksbehandlingsblankett.pdf`);
      res.end(pdf);
    } catch (feil) {
      const error = feil as Error;
      return res.status(500).send(`Generering av dokument (pdf) feilet: ${error.message}`);
    }
  });

  router.get('/dummy-html', async (_req: Request, res: Response) => {
    try {
      const html = await hentDokumentHtml(lesMockFil());
      res.send(html);
    } catch (feil) {
      const error = feil as Error;
      return res.status(500).send(`Generering av dokument (pdf) feilet: ${error.message}`);
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
    genererMetadata(req),
  );
};

export default router;
