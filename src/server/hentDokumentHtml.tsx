import * as React from 'react';
import { IDokumentData } from '../typer/dokumentApi';
import Dokument from './components/Dokument';
import { renderToStaticMarkup } from 'react-dom/server';
import css from './utils/css';
import Header from './components/Header';
import { datoFormat } from './utils/util';

enum HtmlLang {
  NB = 'nb',
}

const hentDokumentHtml = async (data: IDokumentData): Promise<string> => {
  const asyncHtml = () => (
    <html lang={HtmlLang.NB}>
      <head>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <style type="text/css">{css}</style>
        <title>Saksbehandlingsblankett</title>
      </head>
      <body className={'body'}>
        <div>
          <Header
            visLogo={true}
            tittel={'Blankett overgangsstønad'}
            navn={data.personopplysninger.navn}
            fodselsnummer={data.personopplysninger.personIdent}
            dato={new Date().toLocaleDateString('no-NO', datoFormat)}
          />
          <Dokument dokumentData={data} />
        </div>
      </body>
    </html>
  );

  const htmldokument = asyncHtml();
  const dokument = await renderToStaticMarkup(htmldokument);

  return dokument.replace(/(\r\n|\n|\r)/gm, '');
};

export default hentDokumentHtml;
