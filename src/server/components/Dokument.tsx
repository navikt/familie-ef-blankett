import React from 'react';
import {
  IDokumentData,
  IInngangsvilkårGrunnlag,
  IVurdering,
  Vilkår,
  VilkårGruppe,
  vilkårTypeTilTekst,
} from '../../typer/dokumentApi';
import Vilkårsvurdering from './Vilkårsvurdering';
import Medlemskapsgrunnlag from './Medlemskapsgrunnlag';
import LovligOppholdGrunnlag from './LovligOppholdGrunnlag';
import SivilstandGrunnlag from './Sivilstand';
import SamlivGrunnlag from './Samliv';
import MorEllerFarGrunnlag from './MorEllerFarGrunnlag';

interface DokumentProps {
  dokumentData: IDokumentData;
}

function gjelderDetteVilkåret(vurdering: IVurdering, vilkårgruppe: string) {
  switch (vilkårgruppe) {
    case VilkårGruppe.MEDLEMSKAP:
      return vurdering.vilkårType === Vilkår.FORUTGÅENDE_MEDLEMSKAP;
    case VilkårGruppe.LOVLIG_OPPHOLD:
      return vurdering.vilkårType === Vilkår.LOVLIG_OPPHOLD;
    case VilkårGruppe.SIVILSTAND:
      return vurdering.vilkårType === Vilkår.SIVILSTAND;
    case VilkårGruppe.SAMLIV:
      return vurdering.vilkårType === Vilkår.SAMLIV;
    case VilkårGruppe.MOR_ELLER_FAR:
      return vurdering.vilkårType === Vilkår.MOR_ELLER_FAR;
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
            {registergrunnlagForVilkår(grunnlag, vilkårgruppe)}

            <Vilkårsvurdering vurdering={vurdering} />
          </div>
        );
      })}
    </div>
  );
};

function registergrunnlagForVilkår(grunnlag: IInngangsvilkårGrunnlag, vilkårgruppe: string) {
  switch (vilkårgruppe) {
    case VilkårGruppe.MEDLEMSKAP:
      return <Medlemskapsgrunnlag medlemskap={grunnlag.medlemskap} />;
    case VilkårGruppe.LOVLIG_OPPHOLD:
      return <LovligOppholdGrunnlag medlemskap={grunnlag.medlemskap} />;
    case VilkårGruppe.SIVILSTAND:
      return <SivilstandGrunnlag sivilstand={grunnlag.sivilstand} />;
    case VilkårGruppe.SAMLIV:
      return <SamlivGrunnlag />;
    case VilkårGruppe.MOR_ELLER_FAR:
      return <MorEllerFarGrunnlag barnMedSamvær={grunnlag.barnMedSamvær} />;
    default:
      return <div />;
  }
}

export default Dokument;
