import React from 'react';
import {
  IÅrsakRevurdering,
  opplysningskildeTilTekst,
  Årsak,
  årsakRevuderingTilTekst,
} from '../../typer/dokumentApi';

export const ÅrsakRevurdering: React.FC<{ årsakRevurdering?: IÅrsakRevurdering }> = ({
  årsakRevurdering,
}) =>
  årsakRevurdering ? (
    <div className={'page-break'}>
      <div>
        <h3>Årsak revurdering:</h3>
        <div>
          <strong>Årsak:</strong> {årsakRevuderingTilTekst[årsakRevurdering.årsak]}
        </div>
        <div>
          <strong>Opplysningsskilde:</strong>{' '}
          {opplysningskildeTilTekst[årsakRevurdering.opplysningskilde]}
        </div>
        {årsakRevurdering.årsak === Årsak.ANNET && årsakRevurdering.beskrivelse && (
          <div>
            <strong>Begrunnelse:</strong> {årsakRevurdering.beskrivelse}
          </div>
        )}
      </div>
    </div>
  ) : null;
