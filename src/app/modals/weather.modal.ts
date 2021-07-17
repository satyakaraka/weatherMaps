export interface WeatherData {
    base?: string;
    clouds?: Clouds;
    cod?: number;
    coord?: Coordinates;
    dt?: number;
    id?: number;
    main?: Main;
    name?: string;
    sys?: Sys;
    timezone?: number;
    visibility?: number;
    weather?: Weather[];
    wind?: Wind;
    dt_txt?: string;
    pop?: any;
}

export interface Clouds {
    all?: number
}
export interface Coordinates {
    lat: number;
    lon: number;
}
export interface Main {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    grnd_level?: number;
    sea_level?: number;
    temp_kf?: number;
}
export interface Sys {
    country?: string;
    id?: number;
    sunrise?: number;
    sunset?: number;
    type?: number;
    pod?: string;
}
export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}
export interface Wind {
    deg: number;
    speed: number;
    gust?: number;
}
export interface WeatherDetails {
    city: City;
    cnt: number;
    cod: string;
    message: number;
    list: WeatherData[];
}
export interface City {
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
    coord: Coordinates;
}