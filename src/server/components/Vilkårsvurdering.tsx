import React from 'react';
import {
  delvilkårTypeTilTekst,
  IVurdering,
  resultatTilTekst,
  svarIdTilTekst,
  Vilkår,
  Vilkårsresultat,
} from '../../typer/dokumentApi';
import OppfyltIkon from './ikoner/OppfyltIkon';
import IkkeOppfylt from './ikoner/IkkeOppfylt';
import InfoIkon from './ikoner/InfoIkon';
import { IkkeVurdert } from './ikoner/IkkeVurdert';

interface Props {
  vurdering: IVurdering;
}

const resultatIkon = (resultat: Vilkårsresultat) => {
  switch (resultat) {
    case Vilkårsresultat.OPPFYLT:
      return <OppfyltIkon heigth={24} width={24} />;
    case Vilkårsresultat.IKKE_OPPFYLT:
      return <IkkeOppfylt heigth={24} width={24} />;
    case Vilkårsresultat.SKAL_IKKE_VURDERES:
      return <InfoIkon heigth={24} width={24} />;
    default:
      return <IkkeVurdert heigth={24} width={24} />;
  }
};

const Vilkårsvurdering: React.FC<Props> = ({ vurdering }) => {
  const resultat =
    vurdering.vilkårType === Vilkår.TIDLIGERE_VEDTAKSPERIODER
      ? Vilkårsresultat.OPPFYLT
      : vurdering.resultat;
  return (
    <>
      <div className={'vilkårsresultat'}>
        <strong>Vilkårsvurdering</strong>: {resultatTilTekst[resultat]}{' '}
        <div className={'vilkårsresultat-ikon'}>
          <span style={{ paddingBottom: '20%' }}>{resultatIkon(resultat)}</span>
        </div>
      </div>

      {vurdering.delvilkårsvurderinger
        .filter(
          delvilkårsvurderinger => delvilkårsvurderinger.resultat !== Vilkårsresultat.IKKE_AKTUELL,
        )
        .map((delvilkårsvurderinger, i) => {
          return (
            <div className={'delvilkår'} key={i}>
              <span>
                <strong>Delvurdering:</strong> {resultatTilTekst[delvilkårsvurderinger.resultat]}
              </span>
              {delvilkårsvurderinger.vurderinger.map((delvilkår, subIndex) => {
                return (
                  <div className={'delvilkår'} key={subIndex}>
                    <div>
                      {delvilkårTypeTilTekst[delvilkår.regelId]}{' '}
                      {delvilkår.svar ? svarIdTilTekst[delvilkår.svar] : 'Ikke besvart'}
                    </div>
                    {delvilkår.begrunnelse && (
                      <div>
                        Begrunnelse:{' '}
                        <p style={{ whiteSpace: 'pre-wrap' }}>{delvilkår.begrunnelse}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default Vilkårsvurdering;
