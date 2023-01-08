import { FlightDetail, Price } from "../../types/types";
import * as moment from 'moment';
import { TbArrowsLeftRight } from "react-icons/tb";

interface FlightsProps {
    flights: FlightDetail[]
}

const FlightDetails: React.FC<FlightsProps> = ({flights}) => {

    const addStorage = () => {
        // let storedDatas = (window.localStorage.flights ? window.localStorage.flights.split(",") : []) ;
        
        // if(!(storedDatas.includes(flight[0]?.flightId))){
        //      storedDatas.push(flight[0]?.flightId);
        //      window.localStorage.flights = storedDatas;
        // }
        console.log('added');
    };
 
    // const deleteStorage = () => {
    //     let stored = window.localStorage.flights.split(",");
    //     let newData = stored.filter((id: string) => id !== flight?.flightId)
    //     window.localStorage.flights = newData;
    // };

    return (
        <div className="card my-3 w-75">
            <div className="card-header">
                <h3 className="card-title">Detail du vol aller-retour</h3>
            </div>
            <div className="card-body">
                <div className="d-flex" style={{gap:'6em'}}>
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
                <div className="d-flex" style={{gap:'6em'}}>
                    {
                        flights.length > 0 && flights.map((el: FlightDetail) => {
                            return el.priceOptions.map((p: Price) => {
                                return (
                                    <div className="d-flex flex-column">
                                        <h1>{p.agent}</h1>
                                        <h3 className="fs-bold">{Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'}).format(p.totalPrice)}</h3>
                                    </div>
                                );
                            });
                        })
                    }
                </div>
            </div>
            <div className="card-footer text-center">
                <button className="btn btn-outline-danger" onClick={addStorage}> Ajouter aux favoris ❤️</button>
            </div>
        </div>
    );
}

export default FlightDetails;