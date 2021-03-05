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
import AleneomsorgGrunnlag from './AleneomsorgGrunnlag';

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
    case VilkårGruppe.ALENEOMSORG:
      return vurdering.vilkårType === Vilkår.ALENEOMSORG;
    default:
      return false;
  }
}

const Dokument = (dokumentProps: DokumentProps) => {
  return (
    <div>
      {Object.keys(VilkårGruppe).map(vilkårgruppe => {
        const vurderinger = dokumentProps.dokumentData.inngangsvilkår.vurderinger.filter(
          vurdering => gjelderDetteVilkåret(vurdering, vilkårgruppe),
        );
        if (vurderinger.length === 0) {
          return <div key={vilkårgruppe}>Kan ikke finne noen data for: {vilkårgruppe}</div>;
        }
        const grunnlag = dokumentProps.dokumentData.inngangsvilkår.grunnlag;
        return vurderinger.map(vurdering => {
          return (
            <div key={vurdering.id}>
              <h2>{vilkårTypeTilTekst[vurdering.vilkårType]}</h2>
              {registergrunnlagForVilkår(grunnlag, vilkårgruppe, vurdering.barnId)}

              <Vilkårsvurdering vurdering={vurdering} />
            </div>
          );
        });
      })}
    </div>
  );
};

function registergrunnlagForVilkår(
  grunnlag: IInngangsvilkårGrunnlag,
  vilkårgruppe: string,
  barnId?: string,
) {
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
    case VilkårGruppe.ALENEOMSORG:
      return <AleneomsorgGrunnlag barnMedSamvær={grunnlag.barnMedSamvær} barnId={barnId} />;
    default:
      return <div />;
  }
}

export default Dokument;
