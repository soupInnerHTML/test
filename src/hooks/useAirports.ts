import {ChangeEvent, useEffect, useMemo, useState} from "react";
import api from "../api";
import {useDebounce} from "use-hooks";

export default function () {
  const [airports, setAirports] = useState<IAirport[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchAirports();
  }, [])

  async function fetchAirports() {
    const {data} = await api.fetchAirports();
    setAirports(data)
    setLoading(false)
  }

  function searchInAirportsState(query: string) {
    const _query = query.toLowerCase();
    return airports.filter(({iata, name}) => iata.toLowerCase().startsWith(_query)
      || name.toLowerCase().startsWith(_query))
  }

  function clearFilters() {
    setAirports(airports.map((airport) => ({
      ...airport,
      filtered: false
    })));
  }

  async function searchAirports(query: string) {
    if(!query) {
      return clearFilters()
    }

    let data: IAirport[];
    data = searchInAirportsState(query)
    if(!data.length) {
      data = await api.searchAirports(query);
    }
    filterAirports(data)
  }

  function filterAirports(data: IAirport[]) {
    setAirports(airports.map(airport => {
      const targetIndex = data.findIndex(item => item.icao === airport.icao);
      return {...airport, filtered: targetIndex === -1}
    }))
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 250)

  useEffect(() => {
    if(!loading) {
      searchAirports(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  const isNothingFound = useMemo(() => {
    return airports.filter(airport => !airport.filtered).length === 0
  }, [airports]);

  return {
    isNothingFound, setSearchQuery, loading, airports, input: {
      value: searchQuery,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)
    }
  }
}
