import React from 'react';
import { EBehandlingResultat, ISøknadsdatoer, IVedtak } from '../../typer/dokumentApi';
import { InnvilgeVedtak } from './InnvilgeVedtak';
import { AvslåVedtak } from './AvslåVedtak';

export const Vedtak: React.FC<{ vedtak: IVedtak; søknadsdatoer: ISøknadsdatoer }> = ({
  vedtak,
  søknadsdatoer,
}) => {
  switch (vedtak.resultatType) {
    case EBehandlingResultat.INNVILGE:
      return <InnvilgeVedtak vedtak={vedtak} søknadsdatoer={søknadsdatoer} />;
    case EBehandlingResultat.AVSLÅ:
      return <AvslåVedtak {...vedtak} />;
    default:
      return null;
  }
};
