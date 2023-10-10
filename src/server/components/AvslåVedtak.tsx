import React from 'react';
import { IAvslåVedtak } from '../../typer/dokumentApi';

export const AvslåVedtak: React.FC<IAvslåVedtak> = ({ avslåÅrsak, avslåBegrunnelse }) => {
  return (
    <div className={'page-break'}>
      <h2>Vedtak</h2>
      <h3>Resultat</h3>
      <div>Avslå</div>
      <h4>Årsak</h4>
      <p>{avslåÅrsak}</p>
      <h4>Begrunnelse</h4>
      <p style={{ whiteSpace: 'pre-wrap' }}>{avslåBegrunnelse}</p>
    </div>
  );
};
