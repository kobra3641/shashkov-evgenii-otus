import ITown from "../interfaces/itown";
import russianTowns from './../data/russian-towns.json';

class DataService {

    storageWeatherPerTownName = 'weatherPerTown';

    async getWeather(moreOneDay: boolean, town: ITown) {
        if(town) {
            const urlParams = 'mode=json&units=metric&lang=ru&appid=a6320e82306f665d9dd5104521c34db8';
            const url = moreOneDay ?
                `http://api.openweathermap.org/data/2.5/forecast?lat=${town.coords?.lat}&lon=${town.coords?.lon}&${urlParams}` :
                `http://api.openweathermap.org/data/2.5/weather?lat=${town.coords?.lat}&lon=${town.coords?.lon}&${urlParams}`;

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}` +
                    `, received ${res.status}`)
            }

            return await res.json();
        }
    }

    async getWeatherByUrl() {
        const townName = decodeURI(window.location.href).substring(22)
        const town = await russianTowns.filter(item => item.name.toLowerCase() === townName.toLowerCase()).pop() as ITown;
        return await this.getWeather(true, town);
    }

    getFromStorage(): ITown[]{
        const storageData = localStorage.getItem(this.storageWeatherPerTownName);
        if(storageData) {
            const towns = JSON.parse(storageData);
            return towns;
        }
        return [{
            "coords": {
                "lat": "55.75583",
                "lon": "37.61778"
            },
            "district": "Центральный",
            "name": "Москва",
            "population": 11514330,
            "subject": "Москва"
        },];
    }
}

export default DataService
