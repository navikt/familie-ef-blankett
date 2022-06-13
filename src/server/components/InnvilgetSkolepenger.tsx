import React from 'react';
import {
  IInnvilgeVedtakSkolepenger,
  ISøknadsdatoer,
  utgiftstypeTilTekst,
} from '../../typer/dokumentApi';
import {
  formaterNullableIsoDato,
  formaterNullableMånedÅr,
  parseOgFormaterÅrMåned,
} from '../utils/util';

export const InnvilgetSkolepenger: React.FC<{
  vedtak: IInnvilgeVedtakSkolepenger;
  søknadsdatoer?: ISøknadsdatoer;
}> = ({ vedtak, søknadsdatoer }) => {
  // const { begrunnelse } = vedtak;
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
      <h3>Utgifter til skolepenger</h3>
      {vedtak.skoleårsperioder.map(skoleårsperiode => (
        <div>
          <h4>Utgifter</h4>
          <table>
            <thead>
              <tr>
                <th>Utgiftsdato</th>
                <th>Utgiftstype</th>
                <th>Utgiftstype</th>
                <th>Stønadsbeløp</th>
              </tr>
            </thead>
            <tbody>
              {skoleårsperiode.utgiftsperioder.map(utgift => (
                <tr>
                  <th>{parseOgFormaterÅrMåned(utgift.årMånedFra)}</th>
                  <th>
                    {utgift.utgiftstyper
                      .map(utgiftstype => utgiftstypeTilTekst[utgiftstype])
                      .join(', ')}
                  </th>
                  <th>{utgift.utgifter}</th>
                  <th>{utgift.stønad}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Studiebelastning</h4>
          <table>
            <thead>
              <tr>
                <th>Fra</th>
                <th>Til</th>
                <th>Studietype</th>
                <th>Belastning</th>
              </tr>
            </thead>
            <tbody>
              {skoleårsperiode.perioder.map(periode => (
                <tr>
                  <th>{parseOgFormaterÅrMåned(periode.årMånedFra)}</th>
                  <th>{parseOgFormaterÅrMåned(periode.årMånedTil)}</th>
                  <th>{periode.studietype}</th>
                  <th>{periode.studiebelastning} %</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className={'page-break'}>
        <h4>Begrunnelse</h4>
        <p style={{ whiteSpace: 'pre-wrap' }}>{vedtak.begrunnelse}</p>
      </div>
    </div>
  );
};
