import React from 'react';
import { IBarnMedSamvær } from '../../typer/dokumentApi';

interface Props {
  barnMedSamvær: IBarnMedSamvær[];
}

const MorEllerFarGrunnlag: React.FC<Props> = ({ barnMedSamvær }) => {
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
            </div>
          );
        })}
    </>
  );
};

export default MorEllerFarGrunnlag;
