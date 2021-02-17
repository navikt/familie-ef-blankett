import React from 'react';
import { IDokumentData, IVurdering, Vilkår, VilkårGruppe } from '../../typer/dokumentApi';

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
  console.log(dokumentProps);

  return (
    <div>
      {Object.keys(VilkårGruppe).map(vilkårgruppe => {
        const vurderingForVilkårgruppe = dokumentProps.dokumentData.inngangsvilkår.vurderinger.find(
          vurdering => gjelderDetteVilkåret(vurdering, vilkårgruppe),
        );
        if (vurderingForVilkårgruppe === undefined) {
          return <div>Kan ikke finne noen data for: {vilkårgruppe}</div>;
        }
        return (
          <>
            <div>Grunnlag</div>
            <div>{vurderingForVilkårgruppe.vilkårType}</div>
          </>
        );
      })}
    </div>
  );
};

export default Dokument;
