import React from 'react';
import { IAvslåVedtak } from '../../typer/dokumentApi';

export const AvslåVedtak: React.FC<IAvslåVedtak> = ({ avslåBegrunnelse }) => {
  return (
    <div className={'page-break'}>
      <h2>Vedtak</h2>
      <h3>Resultat</h3>
      <div>Avslå</div>
      <h4>Begrunnelse</h4>
      <div>{avslåBegrunnelse}</div>
    </div>
  );
};
