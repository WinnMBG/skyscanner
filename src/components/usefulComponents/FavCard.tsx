import { Favorite, FlightDetail } from "../../types/types";
import * as moment from 'moment';
import { TbArrowsLeftRight } from "react-icons/tb";
// import {useState} from 'react';

interface FProps {
    flights: FlightDetail[],
}

const FavCard: React.FC<FProps> = ({ flights }) => {

    const deleteStorage = () => {
        let stored = window.localStorage.flights.split(",");
        let id: string = `${flights[0].flightId}|${flights[1].flightId}`
        let newData: Favorite[] = stored.filter((fav: Favorite) => fav.id !== id)
        window.localStorage.flights = newData;
        return newData;
    };

    return (
        <div className="card my-3 w-75">
            <div className="card-header">
                <h3 className="card-title">Detail du vol aller-retour</h3>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-center" style={{gap:'6em'}}>
                    <p className="card-text">
                        <h1>Vol Aller</h1>
                        {'Ville de départ:  '}{flights[0]?.origin}<br/>
                        {`Ville d'arrivée:  `}{flights[0]?.destination}<br/>
                        {'Heure de départ:  '}{flights[0]?.hDepart}<br/>
                        {`Heure d'arrivée:  `}{flights[0]?.hArrival}<br/>
                        {`Durée du vol:  `}{moment.utc().startOf('day').add(flights[0]?.duration, 'minutes').format('hh:mm')}<br/>
                    </p>
                    <span><TbArrowsLeftRight size={45}/></span>
                    <p className="card-text">
                        <h1>Vol Retour</h1>
                        {'Ville de départ:  '}{flights[1]?.origin}<br/>
                        {`Ville d'arrivée:  `}{flights[1]?.destination}<br/>
                        {'Heure de départ:  '}{flights[1]?.hDepart}<br/>
                        {`Heure d'arrivée:  `}{flights[1]?.hArrival}<br/>
                        {`Durée du vol:  `}{moment.utc().startOf('day').add(flights[1]?.duration, 'minutes').format('hh:mm')}<br/>
                    </p>
                </div>
            </div>
            <div className="card-footer text-center">
                <button className="btn btn-outline-danger" onClick={deleteStorage}> Supprimer des favoris ❤️</button>
            </div>
        </div>
    );
}

export default FavCard;