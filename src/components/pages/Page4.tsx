import Header from "../usefulComponents/Header";
import {useState, useEffect} from 'react';
// import axios from "axios";
import FlightDetails from "../usefulComponents/FlightDetails";
import { FlightDetail } from "../../types/types";

const Page4: React.FC = () => {
    const [listData, setListData] = useState<FlightDetail[][]>([]);

    useEffect(() => {
        let moviesId: FlightDetail[] = (window.localStorage.movies ? window.localStorage.movies.split(",") : []);
        setListData([moviesId]);
    },[])

    // const deleteStorage = () => {
    //     let stored = window.localStorage.flights.split(",");
    //     let newData = stored.filter((id: string) => id !== flight?.flightId)
    //     window.localStorage.flights = newData;
    // };

    return(
        <div className="container text-center my-5 animate__animated animate__bounceInUp">
           <h2>Favoris<span>❤️</span></h2>
           <div className="result d-flex flex-column align-items-center my-3">
            {listData.length > 0 ? (listData.map((flight) => {
                return (<FlightDetails flights={flight} key={flight[0]?.flightId}/>)
            })) : <h1>No favorites for the moment...</h1>}
           </div>
        </div>
    );
};

export default Page4;