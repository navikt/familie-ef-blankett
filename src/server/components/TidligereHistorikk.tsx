import React from 'react';

export const TidligereHistorikk: React.FC = () => {
  // Hardkodet test
  const TidligereHistorikkTabell: React.FC = () => {
    return (
      <table>
        <tr>
          <th>Periode</th>
          <th>Periodetype</th>
          <th>Måneder med utbetaling</th>
          <th>Måneder uten utbetaling</th>
        </tr>
        <tr>
          <td>01.01.2020 - 31.12.2020</td>
          <td>Hovedperiode</td>
          <td>1</td>
          <td>5</td>
        </tr>
        <tr>
          <td>01.01.2019 - 31.12.2019</td>
          <td>Forlengelse</td>
          <td>2</td>
          <td>-</td>
        </tr>
        <tr>
          <td>01.01.2018 - 31.12.2018</td>
          <td>Hovedperiode</td>
          <td>8</td>
          <td>16</td>
        </tr>
      </table>
    );
  };
  return (
    <div>
      <h3>Registerdata</h3>
      <TidligereHistorikkTabell />
    </div>
  );
};
