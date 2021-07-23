export interface IWeather {
    main: {
        temp: number,
        humidity: number,
        pressure: number
    }
    wind: {
        speed: number
    }
}
