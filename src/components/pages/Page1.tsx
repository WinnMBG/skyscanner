import AirportCard from '../usefulComponents/AirportCard';
import Form from '../usefulComponents/Form'
import Search from '../usefulComponents/Search'
import { useState } from 'react';
import { ImAirplane } from 'react-icons/im';
import axios from 'axios';
import { Airport } from '../../types/types';

const Page1: React.FC = () => {

    const [airports, setAirports] = useState<Airport[]>([])
    const [city, setSearch] = useState<string>('')
    // const [status, setStatus] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>("");

    const getAirports = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.get( `${process.env.REACT_APP_SA_URL}`, 
        { 
            params: {query: city},
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
            }
        });
        let airTab: Airport[] = data.data.map((element: any) => {
            let airItem: Airport = {
                placeId: element.PlaceId,
                cityName: element.CityName,
                countryName: element.CountryName,
                iataCode: element.IataCode,
                placeName: element.PlaceName
            }
            return airItem;
        });
        console.log('before', airTab);
        const airTabTmp: Airport[] = airTab.filter((element: Airport) => { return ((element.cityName === city) && (element.placeId !== '' ))} );
        console.log('after filtering', airTabTmp);
        if(airTabTmp.length > 0) {
            setAirports(airTabTmp);
            setSearch('');
        } else {
            alert('Aucun résultat trouvé. Veuillez retenter votre recherche');
        } 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className='container text-center animate__animated animate__bounceInDown'>
            <h1 className="my-5"> 
                Welcome to Winn Travels
                <span className='ms-2'>
                    <ImAirplane size={25}/>
                </span>
            </h1>
            <h3 className="my-5"> Trouvez les aéroports proche de la ville que vous recherchez.</h3>
            <Form onSubmit={(e) => getAirports(e)}>
                <Search
                type='text'
                placeholder='Recherchez la ville...'
                value={city}
                onChange={handleChange}
                />
                <button type='submit' className='btn btn-outline-dark'> Rechercher </button>
            </Form>
            <div className='d-flex flex-column align-items-center my-5'>
                {airports.length > 0 && airports.map((item) => <AirportCard key={item.placeId} airport={item}/> )}
            </div>
        </div>
    );
}

export default Page1;