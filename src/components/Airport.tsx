import React from 'react';

interface ITableRowProps {
  name: string;
  coordinates: string;
}

const Airport: React.FC<ITableRowProps> = ({name, coordinates}) => {
  return (
    <tr>
      <th>{name}</th>
      <th>{coordinates}</th>
    </tr>
  );
};

export default Airport;
