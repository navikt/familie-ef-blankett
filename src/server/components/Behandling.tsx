import React from 'react';
import { behandlingÅrsakTilTekst, IBehandling } from '../../typer/dokumentApi';

export const Behandling: React.FC<{ behandling: IBehandling }> = ({ behandling }) => {
  return (
    <div className={'page-break'}>
      <h3>Behandling</h3>
      <span>
        <strong>Behandlingsårsak:</strong> {behandlingÅrsakTilTekst[behandling.årsak]}
      </span>
    </div>
  );
};
