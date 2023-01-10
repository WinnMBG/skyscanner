import Header from "../usefulComponents/Header";
import {useState, useEffect} from 'react';
// import axios from "axios";
import FavCard from "../usefulComponents/FavCard";
import { Favorite, FlightDetail, Leg } from "../../types/types";
import axios from "axios";

const Page4: React.FC = () => {
    const [listData, setListData] = useState<FlightDetail[][]>([]);

    useEffect(() => {
        let flightsFav: Favorite[] = (window.localStorage.flights ? window.localStorage.flights : []);
        console.log(`${{flightsFav}}`);
        // const fetchData = async (fli: Favorite[]) => {
        //     let tab: FlightDetail[][] = []
        //     let i = 0;
        //     while (i < flightsFav.length) {
        //         const f: FlightDetail[] = await getFlightDetails(fli[i]);
        //         tab.push(f);
        //         i++;
        //     }
        //     setListData(tab);
        // }
        // fetchData(flightsFav);
    },[])

    const getFlightDetails = async (f: Favorite): Promise<FlightDetail[]> => {
        // e.preventDefault();
        const url: string[] = window.location.href.split('/');
        console.log(url);
        const legs: Leg[] = f.legs;
        console.log(legs, f.id);

        // const { data } = await axios.get( `${process.env.REACT_APP_FD_URL}`, 
        // { 
        //     params: {
        //         itineraryId: f.id,
        //         legs: `[${JSON.stringify(legs[0])}, ${JSON.stringify(legs[1])}]`,
        //         currency: 'EUR',
        //         countryCode: 'FR',
        //         market: 'fr-FR'
        //       },
        //       headers: {
        //         'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        //         'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        //       }
        // });

        let flightstab: FlightDetail[] = []
        // let aller: FlightDetail = {
        //     flightId: f.id.split('|')[0],
        //     origin: data.data.legs[0].origin.name+` (${data.data?.legs[0].origin.displayCode})`,
        //     hDepart:data.data.legs[0].departure,
        //     destination: data.data.legs[0].destination.name+` (${data.data?.legs[0].destination.displayCode})`,
        //     hArrival:data.data.legs[0].arrival,
        //     duration: data.data.legs[0].duration,
        // }

        // flightstab.push(aller);

        // let retour: FlightDetail = {
        //     flightId: f.id.split('|')[1],
        //     origin: data.data.legs[1].origin.name+` (${data.data?.legs[1].origin.displayCode})`,
        //     hDepart:data.data.legs[1].departure,
        //     destination: data.data.legs[1].destination.name+` (${data.data?.legs[1].destination.displayCode})`,
        //     hArrival:data.data.legs[1].arrival,
        //     duration: data.data.legs[1].duration,
        // }
        // flightstab.push(retour);
        // //Definir un nouveau type ici pour le traitement des vols après avoir eu le détail de l'itinéraire total.
        return flightstab;
    }

    return(
        <div className="container text-center my-5 animate__animated animate__bounceInUp">
           <h2>Favoris<span>❤️</span></h2>
           <div className="result d-flex flex-column align-items-center my-3">
            {listData.length > 0 ? (listData.map((flight: FlightDetail[]) => {
                return (<FavCard flights={flight}/>)
            })) : <h1>Pas reussi à récupérer les favoris...</h1>}
           </div>
        </div>
    );
};

export default Page4;