import React from 'react';
import { ITidligereVedtaksperioder } from '../../typer/dokumentApi';

export const TidligereHistorikk: React.FC<{
  tidligereVedtaksperioder: ITidligereVedtaksperioder | undefined;
}> = ({ tidligereVedtaksperioder }) => {
  const TidligereHistorikkTabell: React.FC = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Periode</th>
            <th>Periodetype</th>
            <th>Måneder med utbetaling</th>
            <th>Måneder uten utbetaling</th>
          </tr>
        </thead>
        {tidligereVedtaksperioder?.sak.periodeHistorikkOvergangsstønad?.map(periode => {
          return (
            <tbody>
              <tr>
                <td>
                  {periode.fom} - {periode.tom}
                </td>
                <td>{periode.vedtaksperiodeType}</td>
                <td>{periode.antallMåneder}</td>
                <td>{periode.antallMånederUtenBeløp}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  };
  return (
    <>
      <h3>Registerdata</h3>
      <TidligereHistorikkTabell />
    </>
  );
};
