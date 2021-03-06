import React from 'react';
import { IBarnMedSamvær } from '../../typer/dokumentApi';
import AnnenForelder from './AnnenForelder';

interface Props {
  barnMedSamvær: IBarnMedSamvær[];
}

const NyttBarnSammePartner: React.FC<Props> = ({ barnMedSamvær }) => {
  return (
    <>
      <h3>Registerdata</h3>
      {barnMedSamvær
        .filter(barn => barn.registergrunnlag.fødselsnummer)
        .map((barn, index) => {
          return (
            <div key={index}>
              <h4>Navn: {barn.registergrunnlag.navn}</h4>
              <div>Fødsels eller D-nummer: {barn.registergrunnlag.fødselsnummer}</div>
              <h4>Annen forelder register:</h4>
              <AnnenForelder annenForelder={barn.registergrunnlag.forelder} />
              <h4>Annen forelder søknad:</h4>
              <AnnenForelder
                annenForelder={barn.søknadsgrunnlag.forelder}
                erRegisterOpplysning={false}
              />
            </div>
          );
        })}
    </>
  );
};

export default NyttBarnSammePartner;
