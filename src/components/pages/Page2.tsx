import FlightSearch from "../usefulComponents/FlightSearch";
import { ImAirplane } from "react-icons/im";

const Page2: React.FC = () => {
    return (
        <div className="container text-center my-5">
            <h1 className="my-5 animate__animated animate__bounceInRight"> 
                Winn Travels
                <span className='ms-2'>
                    <ImAirplane size={25}/>
                </span>
            </h1>
            <FlightSearch/>
        </div>
    );
}

export default Page2;