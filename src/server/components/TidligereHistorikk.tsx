import React from 'react';
import {
  EPeriodetype,
  ITidligereVedtaksperioder,
  periodetypeTilTekst,
} from '../../typer/dokumentApi';

export const TidligereHistorikk: React.FC<{
  tidligereVedtaksperioder: ITidligereVedtaksperioder | undefined;
}> = ({ tidligereVedtaksperioder }) => {
  const periodeHistorikkOvergangsstønad =
    tidligereVedtaksperioder?.sak.periodeHistorikkOvergangsstønad;
  const tilDagMånedÅr = (dato: string) => {
    const [år, måned, dag] = dato.split('-');
    return `${dag}.${måned}.${år}`;
  };

  const mapTrueFalse = (bool?: boolean): string =>
    bool === true ? 'Ja' : bool === false ? 'Nei' : '';

  const formatterBooleanEllerUkjent = (bool?: boolean) =>
    bool === undefined || bool === null ? 'Ukjent' : mapTrueFalse(bool);

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
          );
        })}
      </table>
    );
  };

  const TidligereHistorikk: React.FC = () => {
    return (
      <>
        <h2>Har bruker tidligere vedtaksperioder i EF Sak eller Infotrygd</h2>
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
