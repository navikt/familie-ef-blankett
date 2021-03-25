import { IAnnenForelder } from '../../typer/dokumentApi';
import React from 'react';
import { formaterNullableIsoDato } from '../utils/util';

interface AnnenForelderProps {
  annenForelder?: IAnnenForelder;
  erRegisterOpplysning?: boolean;
}

const AnnenForelder: React.FC<AnnenForelderProps> = ({
  annenForelder,
  erRegisterOpplysning = true,
}) => {
  if (!annenForelder) {
    if (erRegisterOpplysning) {
      return <div>Annen forelder ikke funnet i registeropplysninger</div>;
    }
    return <div>Annen forelder ikke funnet i søknadopplysninger</div>;
  }
  return (
    <div>
      <div>Navn: {annenForelder.navn}</div>
      <div>Fødsels eller D-nummer: {annenForelder.fødselsnummer}</div>
      {annenForelder.fødselsdato && (
        <div>Fødselsdato: {formaterNullableIsoDato(annenForelder.fødselsdato)}</div>
      )}
      <div>Annen forelder bor i: {annenForelder.bosattINorge ? 'Norge' : '-'}</div>
    </div>
  );
};

export default AnnenForelder;
