import { Airport } from "../../types/types";
import { ImAirplane} from 'react-icons/im';

interface AirportProps {
    airport: Airport
}

const AirportCard: React.FC<AirportProps> = ( { airport } ) => {

    return (
        <div className="card my-3 w-50">
            <div className="card-header">
                <h3 className="card-title">{airport.placeName}{' '}<ImAirplane size={15}/></h3>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {'Ville:  '}{airport.cityName}<br/>
                    {'Pays:  '}{airport.countryName}<br/>
                    {'ID/IATA Code:  '}{airport.placeId}{'/'}{airport.iataCode}<br/>
                </p>
            </div>
        </div>
    );
}

export default AirportCard;