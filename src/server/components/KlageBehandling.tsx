import React from 'react';
import {
  behandlingResultatTilTekst,
  EFormVilkår,
  FormkravFristUnntak,
  formkravFristUnntakTilTekst,
  formVilkårTilTekst,
  hjemmelTilTekst,
  IFormkravVilkår,
  IKlageBehandling,
  IPåklagetVedtak,
  IVurdering,
  vedtakTilTekst,
  årsakTilTekst,
} from '../../typer/klageDokumentApi';
import { formaterIsoDato, formaterIsoDatoTid } from '../utils/util';

const påklagetVedtak = (påklagetVedtak?: IPåklagetVedtak) => {
  if (!påklagetVedtak) {
    return 'Har ikke klaget på et vedtak';
  } else {
    return `${påklagetVedtak.behandlingstype} - ${påklagetVedtak.resultat} - ${formaterIsoDatoTid(
      påklagetVedtak.vedtakstidspunkt,
    )}`;
  }
};

export const KlageBehandling: React.FC<{ behandling: IKlageBehandling }> = ({ behandling }) => {
  return (
    <div className={'page-break'}>
      <h2>Behandling</h2>
      <div>
        <strong>Saksnummer:</strong> {behandling.eksternFagsakId}
      </div>
      <div>
        <strong>Klage mottatt:</strong> {formaterIsoDato(behandling.klageMottatt)}
      </div>
      <div>
        <strong>Resultat:</strong> {behandlingResultatTilTekst[behandling.resultat]}
      </div>
      <div>
        <strong>Vedtak som er påklaget:</strong> {påklagetVedtak(behandling.påklagetVedtak)}
      </div>
    </div>
  );
};

const visUnntak = (klagefristOverholdtUnntak: FormkravFristUnntak) => {
  return (
    <>
      <h5>Er unntak for klagefristen oppfylt?</h5>
      <span> {formkravFristUnntakTilTekst[klagefristOverholdtUnntak]}</span>
    </>
  );
};
const visUnntakHvisMulig = (formkrav: IFormkravVilkår) => {
  formkrav.klagefristOverholdt == EFormVilkår.IKKE_OPPFYLT &&
    formkrav.klagefristOverholdtUnntak &&
    visUnntak(formkrav.klagefristOverholdtUnntak);
};

export const KlageFormkrav: React.FC<{ formkrav: IFormkravVilkår }> = ({ formkrav }) => {
  return (
    <div className={'page-break'}>
      <h2>Formkrav</h2>
      <h4>Er klager part i saken?</h4>
      <span>{formVilkårTilTekst[formkrav.klagePart]}</span>
      <h4>Klages det på konkrete elementer i vedtaket?</h4>
      <span>{formVilkårTilTekst[formkrav.klageKonkret]}</span>
      <h4>Er klagefristen overholdt?</h4>
      <span>{formVilkårTilTekst[formkrav.klagefristOverholdt]}</span>
      {visUnntakHvisMulig(formkrav)}
      <h4>Er klagen signert?</h4>
      <span>{formVilkårTilTekst[formkrav.klageSignert]}</span>
      {formkrav.saksbehandlerBegrunnelse && (
        <>
          <h4>Begrunnelse</h4>
          <span style={{ whiteSpace: 'pre-wrap' }}>{formkrav.saksbehandlerBegrunnelse}</span>
        </>
      )}
      {formkrav.brevtekst && (
        <>
          <h4>Fritekst til brev</h4>
          <span style={{ whiteSpace: 'pre-wrap' }}>{formkrav.brevtekst}</span>
        </>
      )}
    </div>
  );
};

export const Klagevurdering: React.FC<{ vurdering?: IVurdering }> = ({ vurdering }) => {
  if (!vurdering) {
    return null;
  }

  return (
    <div className={'page-break'}>
      <h2>Vurdering</h2>
      <h4>Vedtak</h4>
      <span>{vedtakTilTekst[vurdering.vedtak]}</span>
      {vurdering.hjemmel && (
        <>
          <h4>Hjemmel</h4>
          <span>{hjemmelTilTekst[vurdering.hjemmel]}</span>
        </>
      )}
      {vurdering.årsak && (
        <>
          <h4>Årsak</h4>
          <span>{årsakTilTekst[vurdering.årsak]}</span>
        </>
      )}
      {vurdering.begrunnelseOmgjøring && (
        <>
          <h4>Begrunnelse for omgjøring</h4>
          <span style={{ whiteSpace: 'pre-wrap' }}>{vurdering.begrunnelseOmgjøring}</span>
        </>
      )}
      {vurdering.innstillingKlageinstans && (
        <>
          <h4>Innstilling til NAV Klageinstans</h4>
          <span style={{ whiteSpace: 'pre-wrap' }}>{vurdering.innstillingKlageinstans}</span>
        </>
      )}
      {vurdering.interntNotat && (
        <>
          <h4>Internt notat</h4>
          <span style={{ whiteSpace: 'pre-wrap' }}>{vurdering.interntNotat}</span>
        </>
      )}
    </div>
  );
};
