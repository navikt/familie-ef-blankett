import React from 'react';
import { aktivitetsTypeTilTekst, IVedtak } from '../../typer/dokumentApi';
import { formaterNullableIsoDato } from '../utils/util';

export const Vedtak: React.FC<{ vedtak: IVedtak }> = ({ vedtak }) => {
  const { resultatType, periodeBegrunnelse, perioder, inntektBegrunnelse } = vedtak;
  return (
    <div>
      <h2>Vedtak</h2>
      <h3>Resultat</h3>
      <div>{resultatType}</div>
      <h3>Vedtaksperiode</h3>
      {perioder.map((periode, indeks) => {
        return (
          <div key={indeks}>
            <h4>Periode</h4>
            <div>Periodetype: {periode.periodeType}</div>
            <div>Aktivitet: {aktivitetsTypeTilTekst[periode.aktivitet]}</div>
            <div>Fra og med: {formaterNullableIsoDato(periode.datoFra)}</div>
            <div>Til og med: {formaterNullableIsoDato(periode.datoTil)}</div>
          </div>
        );
      })}
      <h5>Begrunnelse</h5>
      <div>{periodeBegrunnelse}</div>
      <h3>Inntekt</h3>
      <div>{inntektBegrunnelse}</div>
    </div>
  );
};
