import axios from "axios";

class Api {
  private _instance = axios.create({
      baseURL: 'https://airports-by-api-ninjas.p.rapidapi.com/v1/airports',
      headers: {
        'X-RapidAPI-Key': '4b3d50217bmsh5fd912f66f1e90fp112a84jsnd0835779ceda',
        'X-RapidAPI-Host': 'airports-by-api-ninjas.p.rapidapi.com'
      },
      params: {
        country: 'KZ'
      }
    });

  fetchAirports() {
    return this._instance.get('')
  }
  async searchAirports(nameOrIata: string) {
    const searchResults: IAirport[] = []
    const airportsByName = await this._instance.get('', {
      params: {
        name: nameOrIata.trim()
      }
    })
    searchResults.push(...airportsByName.data)

    if(this._isIata(nameOrIata)) {
      const airportsByIata = await this._instance.get('', {
        params: {
          iata: nameOrIata.trim()
        }
      })

      searchResults.push(...airportsByIata.data)

    }

    return searchResults
  }
  private _isIata(nameOrIata: string) {
    return nameOrIata.length === 3
  }
}

export default new Api()
