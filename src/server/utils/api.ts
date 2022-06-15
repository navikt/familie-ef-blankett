import axios, { AxiosResponse } from 'axios';
import { hentMiljøvariabler } from '../environment';
import { logInfo, Meta } from '@navikt/familie-logging';

export const genererPdf = async (html: string, meta: Meta): Promise<ArrayBuffer> => {
  const url = `${hentMiljøvariabler().FAMILIE_DOKUMENT_API_URL}/api/html-til-pdf`;

  logInfo(`Generer pdf mot ${url}`, meta);
  return axios
    .post(url, html, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'text/html',
        Accept: 'application/pdf',
      },
    })
    .then((res: AxiosResponse<ArrayBuffer>) => res.data)
    .catch(error => {
      logInfo('Feil mot familie-dokument', meta);
      throw error;
    });
};
