import React from 'react';
import {
  EPeriodetype,
  ITidligereVedtaksperioder,
  periodetypeTilTekst,
} from '../../typer/dokumentApi';

export const TidligereHistorikk: React.FC<{
  tidligereVedtaksperioder: ITidligereVedtaksperioder | undefined;
}> = ({ tidligereVedtaksperioder }) => {
  const tilDagMånedÅr = (dato: string) => {
    const [år, måned, dag] = dato.split('-');
    return `${dag}.${måned}.${år}`;
  };

  const TidligereHistorikkTabell: React.FC = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Periode</th>
            <th>Periodetype</th>
            <th>Måneder med utbet.</th>
            <th>Måneder uten utbet.</th>
          </tr>
        </thead>
        {tidligereVedtaksperioder?.sak.periodeHistorikkOvergangsstønad?.map(periode => {
          return (
            <tbody>
              <tr>
                <td>
                  {tilDagMånedÅr(periode.fom)} - {tilDagMånedÅr(periode.tom)}
                </td>
                <td>{periodetypeTilTekst[periode.vedtaksperiodeType] || ''}</td>
                <td>{periode.antallMåneder}</td>
                <td>
                  {periode.antallMånederUtenBeløp >= 1 &&
                  periode.vedtaksperiodeType !== EPeriodetype.SANKSJON
                    ? periode.antallMånederUtenBeløp
                    : '-'}
                </td>
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
