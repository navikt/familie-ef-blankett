import React from 'react';
import {
  delvilkårTypeTilTekst,
  delvilkårÅrsakTilTekst,
  IVurdering,
  unntakTypeTilTekst,
  Vilkårsresultat,
} from '../../typer/dokumentApi';

interface Props {
  vurdering: IVurdering;
}

const Vilkårsvurdering: React.FC<Props> = ({ vurdering }) => {
  return (
    <>
      <h3>Vilkårsvurdering</h3>
      <div>Resultat: {vurdering.resultat}</div>
      {vurdering.begrunnelse && <div>Begrunnelse: {vurdering.begrunnelse}</div>}
      {vurdering.unntak && <div>Unntak: {unntakTypeTilTekst[vurdering.unntak]}</div>}
      <h4>Vurderinger</h4>
      {vurdering.delvilkårsvurderinger
        .filter(delvilkår => delvilkår.resultat !== Vilkårsresultat.IKKE_AKTUELL)
        .map(delvilkår => {
          return (
            <div className={'delvilkår'} key={delvilkår.type}>
              <div>{delvilkårTypeTilTekst[delvilkår.type]}</div>
              <div>Resultat: {delvilkår.resultat}</div>
              {delvilkår.begrunnelse && <div>Begrunnelse: {delvilkår.begrunnelse}</div>}
              {delvilkår.årsak && <div>Årsak: {delvilkårÅrsakTilTekst[delvilkår.årsak]}</div>}
            </div>
          );
        })}
    </>
  );
};

export default Vilkårsvurdering;
