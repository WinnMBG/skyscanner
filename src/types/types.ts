export type Airport = {
    placeId: string;
    placeName: string;
    iataCode: string;
    cityName: string;
    countryName: string;
}

export type FlightLegs = {
    airportId: string;
    origin: string;
    destination: string;
    date:string;
}

export type Leg = {
    origin: string;
    destination: string;
    date:string;
}

export type Flight = {
    flightId: string;
    price: number,
    iataCodeDep: string,
    iataCodeArr: string,
    legs: FlightLegs[],
    totalDuration: number,
}

export type FlightDetail = {
    flightId: string;
    priceOptions: Price[],
    origin: string,
    destination: string,
    duration: number,
    hDepart : string,
    hArrival: string
}

export type Price = {
    totalPrice: number,
    agent: string,
}