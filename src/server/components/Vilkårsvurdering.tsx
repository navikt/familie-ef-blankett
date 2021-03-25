import React from 'react';
import {
  delvilkårTypeTilTekst,
  IVurdering,
  resultatTilTekst,
  svarIdTilTekst,
  Vilkårsresultat,
} from '../../typer/dokumentApi';
import Oppfylt from './ikoner/Oppfylt';
import IkkeOppfylt from './ikoner/IkkeOppfylt';
import IkkeVurdert from './ikoner/IkkeVurdert';

interface Props {
  vurdering: IVurdering;
}

const resultatIkon = (resultat: Vilkårsresultat) => {
  switch (resultat) {
    case Vilkårsresultat.OPPFYLT:
      return <Oppfylt />;
    case Vilkårsresultat.IKKE_OPPFYLT:
      return <IkkeOppfylt />;
    default:
      return <IkkeVurdert />;
  }
};

const Vilkårsvurdering: React.FC<Props> = ({ vurdering }) => {
  return (
    <>
      <div className={'vilkårsresultat'}>
        <strong>Vilkårsvurdering</strong>: {resultatTilTekst[vurdering.resultat]}{' '}
        <div className={'vilkårsresultat-ikon'}>
          <span style={{ paddingBottom: '20%' }}>{resultatIkon(vurdering.resultat)}</span>
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
                    {delvilkår.begrunnelse && <div>Begrunnelse: {delvilkår.begrunnelse}</div>}
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
