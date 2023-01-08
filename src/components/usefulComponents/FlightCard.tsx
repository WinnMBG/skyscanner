import { Flight } from "../../types/types";
import { TbArrowsLeftRight } from 'react-icons/tb';
import * as moment from 'moment';

interface FlightProps {
    flight: Flight,
    date: string,
    dateretour: string
}

const FlightCard: React.FC<FlightProps> = ( { flight, date, dateretour }) => {
    return (
        <>
            <div className="col-sm-12 my-3">
                <button 
                    className="btn btn-light w-100"
                    onClick={() => {
                        console.log(`http://localhost:3000/flightdetail/${flight.iataCodeDep}/${encodeURI(date)}/${flight.iataCodeArr}/${encodeURI(dateretour)}/${encodeURI(flight.flightId)}`);
                        window.location.href = `http://localhost:3000/flightdetail/${flight.iataCodeDep}/${encodeURI(date)}/${flight.iataCodeArr}/${encodeURI(dateretour)}/${encodeURI(flight.flightId)}`
                    }
                }
                >
                    <div className="d-flex flex-column">
                        <div className="d-flex fs-3 justify-content-start">
                            {`Date de l'aller: `}{date} <br/>
                            {`Date du retour: `}{dateretour}
                        </div> <br/>
                        <div>
                            <h1>{flight.legs[0].origin}</h1>
                            <span><TbArrowsLeftRight size={45}/></span>
                            <h1>{flight.legs[0].destination}</h1><br/>
                        </div>
                        <h4 className="fs-3">
                            {`Durée totale (h) : `}{moment.utc().startOf('day').add(flight.totalDuration, 'minutes').format('hh:mm')}
                        </h4><br/>
                        <h3 className="fw-bold text-right">
                            Prix total: {Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(flight.price)}
                        </h3>
                    </div>
                </button>
            </div>
        </>
    );
}

export default FlightCard;