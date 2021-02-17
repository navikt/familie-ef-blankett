import * as React from 'react';
import { IDokumentData } from '../typer/dokumentApi';
import Dokument from './components/Dokument';
import { renderToStaticMarkup } from 'react-dom/server';
import Context from './utils/Context';
import css from './utils/css';
import Header from './components/Header';

enum HtmlLang {
  NB = 'nb',
}

const hentDokumentHtml = async (data: IDokumentData): Promise<string> => {
  const contextValue = { requests: [] };
  const asyncHtml = () => (
    <Context.Provider value={contextValue}>
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
              navn={'navn'}
              fodselsnummer={'fnr'}
              dato={'dato'}
            />
            <Dokument dokumentData={data} />
          </div>
        </body>
      </html>
    </Context.Provider>
  );

  const htmldokument = asyncHtml();
  console.log('Generert dokument i html');
  const dokument = await renderToStaticMarkup(htmldokument);
  console.log('Rendret markup');

  return dokument.replace(/(\r\n|\n|\r)/gm, '');
};

export default hentDokumentHtml;
