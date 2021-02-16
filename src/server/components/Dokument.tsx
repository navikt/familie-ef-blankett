import React from 'react';
import { IDokumentData } from '../../typer/dokumentApi';

interface DokumentProps {
  dokumentData: IDokumentData;
}

const Dokument = (dokumentProps: DokumentProps) => {
  console.log(dokumentProps);
  return <div>Jadda</div>;
};

export default Dokument;
