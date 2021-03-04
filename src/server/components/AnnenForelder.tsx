import { IAnnenForelder } from '../../typer/dokumentApi';
import React from 'react';

interface AnnenForelderProps {
  annenForelder?: IAnnenForelder;
}

const AnnenForelder: React.FC<AnnenForelderProps> = ({ annenForelder }) => {
  if (!annenForelder) {
    return <div>Annen forelder ikke funnet i registeropplysninger</div>;
  }
  return (
    <div>
      <div>Navn: {annenForelder.navn}</div>
      <div>Fødsels eller D-nummer: {annenForelder.fødselsnummer}</div>
      {annenForelder.fødselsdato && <div>Fødselsdato: {annenForelder.fødselsdato}</div>}
      <div>Annen forelder bor i: {annenForelder.bosattINorge ? 'Norge' : '-'}</div>
    </div>
  );
};

export default AnnenForelder;
