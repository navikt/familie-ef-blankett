import React from 'react';
import { NavIkon } from './ikoner/navIkon';

interface HeaderProps {
  tittel: string;
  navn: string;
  fodselsnummer: string;
  dato: string;
  visLogo?: boolean;
}

function Header(props: HeaderProps) {
  const { tittel, navn, fodselsnummer, visLogo, dato } = props;

  return (
    <div className={'header'}>
      <div className="ikon-og-dato">
        {visLogo && <NavIkon />}
        <p>{dato[0]}</p>
      </div>
      <div className={'tittel-og-personinfo'}>
        <h2 className="tittel">{tittel.toUpperCase()}</h2>
        <div className="kolonner">
          <div className="personinfo">
            <div>Navn: {navn}</div>
            <div>Fødselsnummer: {fodselsnummer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
