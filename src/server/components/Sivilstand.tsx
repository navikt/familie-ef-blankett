import React from 'react';
import { ISivilstandVilkår, sivilstandTilTekst } from '../../typer/dokumentApi';
import { formaterNullableIsoDato } from '../utils/util';

interface Props {
  sivilstand: ISivilstandVilkår;
}

const SivilstandGrunnlag: React.FC<Props> = ({ sivilstand }) => {
  return (
    <>
      <h3>Registerdata</h3>
      <div>Sivilstatus: {sivilstandTilTekst[sivilstand.registergrunnlag.type]}</div>
      <div>
        Gyldig fra og med: {formaterNullableIsoDato(sivilstand.registergrunnlag.gyldigFraOgMed)}
      </div>
    </>
  );
};

export default SivilstandGrunnlag;
