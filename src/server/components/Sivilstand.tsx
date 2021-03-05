import React from 'react';
import { ISivilstandInngangsvilkår } from '../../typer/dokumentApi';

interface Props {
  sivilstand: ISivilstandInngangsvilkår;
}

const SivilstandGrunnlag: React.FC<Props> = ({ sivilstand }) => {
  return (
    <>
      <h3>Grunnlag</h3>
      <div>Sivilstatus: {sivilstand.registergrunnlag.type}</div>
      <div>Gyldig fra og med: {sivilstand.registergrunnlag.gyldigFraOgMed}</div>
    </>
  );
};

export default SivilstandGrunnlag;
