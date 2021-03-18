import React from 'react';
import { ISivilstandVilkår } from '../../typer/dokumentApi';

interface Props {
  sivilstand: ISivilstandVilkår;
}

const SivilstandGrunnlag: React.FC<Props> = ({ sivilstand }) => {
  return (
    <>
      <h3>Registerdata</h3>
      <div>Sivilstatus: {sivilstand.registergrunnlag.type}</div>
      <div>Gyldig fra og med: {sivilstand.registergrunnlag.gyldigFraOgMed}</div>
    </>
  );
};

export default SivilstandGrunnlag;
