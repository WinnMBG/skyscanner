import Header from "../usefulComponents/Header";
import {useState, useEffect} from 'react';
// import axios from "axios";
import FlightDetails from "../usefulComponents/FlightDetails";
import { Favorite } from "../../types/types";

const Page4: React.FC = () => {
    // const [listData, setListData] = useState<Favorite[]>([]);

    // useEffect(() => {
    //     let flightsFav: Favorite[] = (window.localStorage.flights ? window.localStorage.flights.split(",") : []);
    //     setListData(flightsFav);
    // },[])

    // // const deleteStorage = () => {
    // //     let stored = window.localStorage.flights.split(",");
    // //     let newData = stored.filter((id: string) => id !== flight?.flightId)
    // //     window.localStorage.flights = newData;
    // // };

    return(
        <div className="container text-center my-5 animate__animated animate__bounceInUp">
           {/* <h2>Favoris<span>❤️</span></h2>
           <div className="result d-flex flex-column align-items-center my-3">
            {listData.length > 0 ? (listData.map((flight) => {
                return (<FlightDetails flights={flight} key={flight[0]?.flightId}/>)
            })) : <h1>No favorites for the moment...</h1>}
           </div> */} <h1>NADA</h1>
        </div>
    );
};

export default Page4;