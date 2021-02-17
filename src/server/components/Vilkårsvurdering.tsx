import React from 'react';
import {
  delvilkårTypeTilTekst,
  delvilkårÅrsakTilTekst,
  IVurdering,
  unntakTypeTilTekst,
} from '../../typer/dokumentApi';

interface Props {
  vurdering: IVurdering;
}

const Vilkårsvurdering: React.FC<Props> = ({ vurdering }) => {
  return (
    <>
      <h3>Vilkårsvurdering</h3>
      <div>Resultat: {vurdering.resultat}</div>
      <div>Begrunnelse: {vurdering.begrunnelse}</div>
      <div>Unntak: {vurdering.unntak && unntakTypeTilTekst[vurdering.unntak]}</div>
      <h4>Delvilkår</h4>
      {vurdering.delvilkårsvurderinger.map(delvilkår => {
        return (
          <div key={delvilkår.type}>
            <div>{delvilkårTypeTilTekst[delvilkår.type]}</div>
            <div>Resultat: {delvilkår.resultat}</div>
            <div>Begrunnelse: {delvilkår.begrunnelse}</div>
            <div>Årsak: {delvilkår.årsak && delvilkårÅrsakTilTekst[delvilkår.årsak]}</div>
          </div>
        );
      })}
    </>
  );
};

export default Vilkårsvurdering;
