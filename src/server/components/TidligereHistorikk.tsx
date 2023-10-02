import React from 'react';
import {
  EPeriodetype,
  ITidligereVedtaksperioder,
  periodetypeTilTekst,
} from '../../typer/dokumentApi';
import { formaterIsoDato, formatterBooleanEllerUkjent } from '../utils/util';

export const TidligereHistorikk: React.FC<{
  tidligereVedtaksperioder: ITidligereVedtaksperioder | undefined;
}> = ({ tidligereVedtaksperioder }) => {
  const periodeHistorikkOvergangsstønad =
    tidligereVedtaksperioder?.sak.periodeHistorikkOvergangsstønad;

  const TidligereHistorikkTabell: React.FC = () => {
    if (!periodeHistorikkOvergangsstønad || periodeHistorikkOvergangsstønad?.length < 1)
      return <></>;

    return (
      <table>
        <tr>
          <th>Periode</th>
          <th>Periodetype</th>
          <th>Måneder med utbet.</th>
          <th>Måneder uten utbet.</th>
        </tr>
        {periodeHistorikkOvergangsstønad?.map(periode => {
          return (
            <tr>
              <td>
                {formaterIsoDato(periode.fom)} - {formaterIsoDato(periode.tom)}
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
          );
        })}
      </table>
    );
  };

  const TidligereHistorikk: React.FC = () => {
    return (
      <>
        <p>Har bruker tidligere vedtaksperioder i EF Sak eller Infotrygd</p>
        <h3>Overgangsstønad</h3>
        <div>
          <strong>Historikk i EF Sak:</strong>{' '}
          {formatterBooleanEllerUkjent(tidligereVedtaksperioder?.sak.harTidligereOvergangsstønad)}
        </div>
        <div>
          <strong>Historikk i Infotrygd:</strong>{' '}
          {formatterBooleanEllerUkjent(
            tidligereVedtaksperioder?.infotrygd.harTidligereOvergangsstønad,
          )}
        </div>
        <TidligereHistorikkTabell />
        <h3>Barnetilsyn</h3>
        <div>
          <strong>Historikk i EF Sak:</strong>{' '}
          {formatterBooleanEllerUkjent(tidligereVedtaksperioder?.sak.harTidligereBarnetilsyn)}
        </div>
        <div>
          <strong>Historikk i Infotrygd:</strong>{' '}
          {formatterBooleanEllerUkjent(tidligereVedtaksperioder?.infotrygd.harTidligereBarnetilsyn)}
        </div>
        <h3>Skolepenger</h3>
        <div>
          <strong>Historikk i EF Sak:</strong>{' '}
          {formatterBooleanEllerUkjent(tidligereVedtaksperioder?.sak.harTidligereSkolepenger)}
        </div>
        <div>
          <strong>Historikk i Infotrygd:</strong>{' '}
          {formatterBooleanEllerUkjent(tidligereVedtaksperioder?.infotrygd.harTidligereSkolepenger)}
        </div>
      </>
    );
  };

  return (
    <>
      <h3>Registerdata</h3>
      <TidligereHistorikk />
    </>
  );
};
