import React from 'react';
import Loader from "./Loader";
import TableHeader from "./TableHeader";
import Airport from "./Airport";
import NothingFound from "./NothingFound";
import useAirports from "../hooks/useAirports";
import fixCoordinate from "../utils/fixCoordinate";

const AirportsTable: React.FC = () => {
  const {loading, input, airports, isNothingFound} = useAirports()

  if(loading) {
    return <Loader/>
  }
  else {
    return (
      <React.Fragment>
        <input
          {...input}
          type="text"
          placeholder={'Please enter airport name or code'}
        />

        <table>
          <TableHeader />

          <tbody>
            {airports.map((airport) => (
              !airport.filtered && <Airport
                key={airport.icao}
                name={`${airport.name} ${airport.iata && `(${airport.iata})`}`}
                coordinates={`${fixCoordinate(airport.latitude)}, ${fixCoordinate(airport.longitude)}`}
              />
            ))}
          </tbody>
        </table>

        {isNothingFound && <NothingFound/>}
      </React.Fragment>
    )
  }
};

export default AirportsTable;
