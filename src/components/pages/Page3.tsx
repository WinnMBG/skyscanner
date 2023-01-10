import { useEffect, useState } from "react";
import { FlightDetail, Leg } from "../../types/types";
import FlightDetails from "../usefulComponents/FlightDetails";
import axios from "axios";

const Page3: React.FC = () => {
    const [flight, setFlight] = useState<FlightDetail[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const f: FlightDetail[] = await getFlightDetails();
            setFlight(f);
        }
        fetchData();
    },[]);

    const getFlightDetails = async (): Promise<FlightDetail[]> => {
        // e.preventDefault();
        const url: string[] = window.location.href.split('/');
        console.log(url);
        const legs: Leg[] = constructLegs(url);

        const { data } = await axios.get( `${process.env.REACT_APP_FD_URL}`, 
        { 
            params: {
                itineraryId: decodeURI(url[url.length - 1]),
                legs: `[${JSON.stringify(legs[0])}, ${JSON.stringify(legs[1])}]`,
                currency: 'EUR',
                countryCode: 'FR',
                market: 'fr-FR'
              },
              headers: {
                'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
              }
        });

        let flightstab: FlightDetail[] = []
        let aller: FlightDetail = {
            flightId: decodeURI(url[url.length - 1]).split('|')[0],
            origin: data.data.legs[0].origin.name+` (${data.data?.legs[0].origin.displayCode})`,
            hDepart:data.data.legs[0].departure,
            destination: data.data.legs[0].destination.name+` (${data.data?.legs[0].destination.displayCode})`,
            hArrival:data.data.legs[0].arrival,
            duration: data.data.legs[0].duration,
        }

        flightstab.push(aller);

        let retour: FlightDetail = {
            flightId: decodeURI(url[url.length - 1]).split('|')[1],
            origin: data.data.legs[1].origin.name+` (${data.data?.legs[1].origin.displayCode})`,
            hDepart:data.data.legs[1].departure,
            destination: data.data.legs[1].destination.name+` (${data.data?.legs[1].destination.displayCode})`,
            hArrival:data.data.legs[1].arrival,
            duration: data.data.legs[1].duration,
        }
        flightstab.push(retour);
        // //Definir un nouveau type ici pour le traitement des vols après avoir eu le détail de l'itinéraire total.
        return flightstab;
    }

    const constructLegs = (url: string[]): Leg[] => {
        // console.log('url décomposé: ',url)
        let tab: Leg[] = []
        let legAller: Leg = {
            origin: url[4],
            destination:url[6],
            date: url[5]
        }
        tab.push(legAller)
        let legRetour: Leg = {
            origin:url[6],
            destination:url[4],
            date:url[7]
        }
        tab.push(legRetour);
        // console.log(tab);
        return tab;
    }

    return (
        <div className="container d-flex justify-content-center">
            <FlightDetails flights={flight} constructLeg={constructLegs}/>
        </div>
    );
}

export default Page3;