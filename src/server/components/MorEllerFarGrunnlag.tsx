import React from 'react';
import { IBarnMedSamvær } from '../../typer/dokumentApi';

interface Props {
  barnMedSamvær: IBarnMedSamvær[];
}

const MorEllerFarGrunnlag: React.FC<Props> = ({ barnMedSamvær }) => {
  return (
    <>
      <h3>Grunnlag</h3>
      {barnMedSamvær
        .filter(barn => barn.registergrunnlag.fødselsnummer)
        .map((barn, index) => {
          return (
            <div key={index}>
              <h4>Barn</h4>
              <div>Fødselsnummer: {barn.registergrunnlag.fødselsnummer}</div>
              <div>Navn: {barn.registergrunnlag.navn}</div>
            </div>
          );
        })}
    </>
  );
};

export default MorEllerFarGrunnlag;
