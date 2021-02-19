import React from 'react';
import {
  IDokumentData,
  IVurdering,
  Vilkår,
  VilkårGruppe,
  vilkårTypeTilTekst,
} from '../../typer/dokumentApi';
import Vilkårsvurdering from './Vilkårsvurdering';
import Medlemskapsgrunnlag from './Medlemskapsgrunnlag';

interface DokumentProps {
  dokumentData: IDokumentData;
}

function gjelderDetteVilkåret(vurdering: IVurdering, vilkårgruppe: string) {
  switch (vilkårgruppe) {
    case VilkårGruppe.MEDLEMSKAP:
      return vurdering.vilkårType === Vilkår.FORUTGÅENDE_MEDLEMSKAP;
    default:
      return false;
  }
}

const Dokument = (dokumentProps: DokumentProps) => {
  return (
    <div>
      {Object.keys(VilkårGruppe).map(vilkårgruppe => {
        const vurdering = dokumentProps.dokumentData.inngangsvilkår.vurderinger.find(vurdering =>
          gjelderDetteVilkåret(vurdering, vilkårgruppe),
        );
        if (vurdering === undefined) {
          return <div key={vilkårgruppe}>Kan ikke finne noen data for: {vilkårgruppe}</div>;
        }
        const grunnlag = dokumentProps.dokumentData.inngangsvilkår.grunnlag;
        return (
          <div key={vurdering.id}>
            <h2>{vilkårTypeTilTekst[vurdering.vilkårType]}</h2>
            <Medlemskapsgrunnlag medlemskap={grunnlag.medlemskap} />

            <Vilkårsvurdering vurdering={vurdering} />
          </div>
        );
      })}
    </div>
  );
};

export default Dokument;
