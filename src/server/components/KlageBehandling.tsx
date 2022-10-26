import React from 'react';
import {
  behandlingResultatTilTekst,
  formVilkårTilTekst,
  hjemmelTilTekst,
  IFormkravVilkår,
  IKlageBehandling,
  IVurdering,
  vedtakTilTekst,
  årsakTilTekst,
} from '../../typer/klageDokumentApi';
import { formaterIsoDato } from '../utils/util';

export const KlageBehandling: React.FC<{ behandling: IKlageBehandling }> = ({ behandling }) => {
  return (
    <div className={'page-break'}>
      <h2>Behandling</h2>
      <div>
        <strong>Klage mottatt:</strong> {formaterIsoDato(behandling.klageMottatt)}
      </div>
      <div>
        <strong>Resultat:</strong> {behandlingResultatTilTekst[behandling.resultat]}
      </div>
      <div>
        <strong>Vedtak som er påklaget:</strong>{' '}
        {behandling.påklagetVedtak.eksternFagsystemBehandlingId || 'Har ikke klaget på et vedtak'}
      </div>
    </div>
  );
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
      <h4>Er klagen signert?</h4>
      <span>{formVilkårTilTekst[formkrav.klageSignert]}</span>
      <h4>Begrunnelse</h4>
      <span>{formkrav.saksbehandlerBegrunnelse}</span>
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
      <>
        <h4>Vurdering</h4>
        <span>{vurdering.beskrivelse}</span>
      </>
      {vurdering.interntNotat && (
        <>
          <h4>Internt notat</h4>
          <span>{vurdering.interntNotat}</span>
        </>
      )}
    </div>
  );
};
