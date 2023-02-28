import React from 'react';
import {View} from 'react-native';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        <th>Name (Code)</th>
        <th>Lat & Lng</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
