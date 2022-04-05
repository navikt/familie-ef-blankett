import React from 'react';
import {
  EBehandlingResultat,
  EStønadType,
  IInnvilgeVedtakBarnetilsyn,
  IInnvilgeVedtakOvergangsstønad,
  ISøknadsdatoer,
  IVedtak,
} from '../../typer/dokumentApi';
import { AvslåVedtak } from './AvslåVedtak';
import { InnvilgetOvergangsstønad } from './InnvilgetOvergangsstønad';
import { InnvilgetBarnetilsyn } from './InnvilgetBarnetilsyn';

export const Vedtak: React.FC<{
  stønadstype: EStønadType;
  vedtak: IVedtak;
  søknadsdatoer?: ISøknadsdatoer;
}> = ({ stønadstype, vedtak, søknadsdatoer }) => {
  switch (vedtak.resultatType) {
    case EBehandlingResultat.INNVILGE:
      return (
        <InnvilgetVedtak stønadstype={stønadstype} vedtak={vedtak} søknadsdatoer={søknadsdatoer} />
      );
    case EBehandlingResultat.AVSLÅ:
      return <AvslåVedtak {...vedtak} />;
    default:
      return null;
  }
};

const InnvilgetVedtak: React.FC<{
  stønadstype: EStønadType;
  vedtak: IVedtak;
  søknadsdatoer?: ISøknadsdatoer;
}> = ({ stønadstype, vedtak, søknadsdatoer }) => {
  switch (stønadstype) {
    case EStønadType.OVERGANGSSTØNAD:
      return (
        <InnvilgetOvergangsstønad
          vedtak={vedtak as IInnvilgeVedtakOvergangsstønad}
          søknadsdatoer={søknadsdatoer}
        />
      );
    case EStønadType.BARNETILSYN:
      return (
        <InnvilgetBarnetilsyn
          vedtak={vedtak as IInnvilgeVedtakBarnetilsyn}
          søknadsdatoer={søknadsdatoer}
        />
      );
    default:
      return null;
  }
};
