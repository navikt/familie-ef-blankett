import React from 'react';
import {
  aktivitetsTypeTilTekst,
  IInnvilgeVedtakOvergangsstønad,
  ISøknadsdatoer,
  periodetypeTilTekst,
} from '../../typer/dokumentApi';
import {
  formaterNullableIsoDato,
  formaterNullableMånedÅr,
  formaterBeløp,
  parseOgFormaterÅrMåned,
} from '../utils/util';

export const InnvilgetOvergangsstønad: React.FC<{
  vedtak: IInnvilgeVedtakOvergangsstønad;
  søknadsdatoer?: ISøknadsdatoer;
}> = ({ vedtak, søknadsdatoer }) => {
  const { periodeBegrunnelse, perioder, inntektBegrunnelse, inntekter } = vedtak;
  return (
    <div className={'page-break'}>
      <h2>Vedtak</h2>
      <h3>Resultat</h3>
      <div>Innvilge</div>
      {søknadsdatoer && (
        <>
          <h3>Søknadsinformasjon</h3>
          <div>Søknadsdato: {formaterNullableIsoDato(søknadsdatoer.søknadsdato)}</div>
          <div>Søker stønad fra: {formaterNullableMånedÅr(søknadsdatoer?.søkerStønadFra)}</div>
        </>
      )}
      <h3>Vedtaksperiode</h3>
      {perioder.map((periode, indeks) => {
        return (
          <div key={indeks}>
            <h4>
              Fra og med {parseOgFormaterÅrMåned(periode.årMånedFra)} til og med{' '}
              {parseOgFormaterÅrMåned(periode.årMånedTil)}
            </h4>
            <div>Periodetype: {periodetypeTilTekst[periode.periodeType]}</div>
            <div>Aktivitet: {aktivitetsTypeTilTekst[periode.aktivitet]}</div>
          </div>
        );
      })}
      <div className={'page-break'}>
        <h4>Begrunnelse</h4>
        <p style={{ whiteSpace: 'pre-wrap' }}>{periodeBegrunnelse}</p>
        <h3>Inntekt</h3>
        {inntekter.map((inntekt, indeks) => {
          return (
            <div key={indeks}>
              <h4>Fra og med {parseOgFormaterÅrMåned(inntekt.årMånedFra)}</h4>
              <div>Dagsats: {formaterBeløp(inntekt.dagsats || 0)}</div>
              <div>Månedsinntekt: {formaterBeløp(inntekt.månedsinntekt || 0)}</div>
              <div>Forventet inntekt (år): {formaterBeløp(inntekt.forventetInntekt || 0)}</div>
              <div>Samordningsfradrag (mnd): {formaterBeløp(inntekt.samordningsfradrag || 0)}</div>
            </div>
          );
        })}
      </div>
      <div className={'page-break'}>
        <h4>Begrunnelse</h4>
        <p style={{ whiteSpace: 'pre-wrap' }}>{inntektBegrunnelse}</p>
      </div>
    </div>
  );
};
