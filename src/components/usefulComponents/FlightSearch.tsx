// import {GoCalendar} from 'react-icons/go';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import React, { useState } from 'react';
import { Flight, FlightLegs } from '../../types/types';
import axios from 'axios';
import FlightCard from './FlightCard';
import { TbArrowsLeftRight } from 'react-icons/tb';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Spinner from 'react-bootstrap/Spinner';

const FlightSearch: React.FC = () => {

    const [depAirport, setDeparture] = useState<string>('');
    const [arrAirport, setArrival] = useState<string>('');
    const [depDate, setDepDate] = useState<string>('');
    const [arrDate, setArrDate] = useState<string>('');
    const [passengers, setNumberPassengers] = useState<number>(0);
    const [flights, setFlights] = useState<Flight[]>([]);
    
    const handleDAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeparture(e.target.value);
    }

    const handleAAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArrival(e.target.value);
    }

    const handleDDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepDate(e.target.value);
    }

    const handleADChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArrDate(e.target.value);
    }

    const handlePassengers = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumberPassengers(parseInt(e.target.value));
    }

    const getIATACode = async (e:React.FormEvent<HTMLFormElement>, value: string): Promise<string> => {
        e.preventDefault();
        const { data } = await axios.get( `${process.env.REACT_APP_SA_URL}`, 
        { 
            params: {query: value},
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
            }
        });
        return data.data[0].PlaceId;
    }

    const getSearchInfos = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(depAirport, depDate, arrAirport, arrDate, passengers);
        const depInput = await getIATACode(e, depAirport);
        const arrInput = await getIATACode(e, arrAirport);
        // console.log(depInput, arrInput);
        const { data } = await axios.get( `${process.env.REACT_APP_SF_URL}`, 
        { 
            params: {
                origin: depInput,
                destination: arrInput,
                date: depDate,
                adults: passengers,
                currency: 'EUR',
                countryCode: 'FR',
                market: 'fr-FR',
                returnDate: arrDate
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
            }
        });
        let flightTab: Flight[] = data.data?.map((element: any) => {

            let flightLegs: FlightLegs[] = []
            element.legs.forEach((leg: any) => {
                let legFormated: FlightLegs = {
                    airportId: leg.id,
                    date: leg.departure.split("T")[0],
                    destination: leg.destination.name,
                    origin: leg.origin.name,
                }
                flightLegs.push(legFormated);
            });

            let flightFormated: Flight = {
               flightId: element.id,
               price: element.price.amount,
               totalDuration: element.totalDuration,
               iataCodeDep: depInput,
               iataCodeArr: arrInput,
               legs: flightLegs
            }
            return flightFormated;
        });
        setFlights(flightTab);
        // setDeparture('');
        // setArrival('');
        // setNumberPassengers(0);
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row g-0 animate__animated animate__bounceInLeft px-3" style={{background: "whitesmoke", borderRadius: "30px", boxShadow:"12px 12px 22px"}}>
                    <div className="py-5">
                        <h1>Recherchez le vol de votre choix</h1>
                        <form 
                            className="d-flex flex-column justify-content-center my-5" 
                            style={{gap:'3em'}}
                            onSubmit={(e) => getSearchInfos(e)}
                        >
                            <div className="form-row d-flex ms-5">
                                <div className="col-sm-5 bg-secondary d-flex flex-column p-3 rounded">
                                    <div className='d-flex'>
                                        From
                                        <FaPlaneDeparture size={30} className='ms-auto'/>
                                    </div>
                                    <input 
                                        type='text'
                                        className='rounded p-2 my-4'
                                        onChange={handleDAChange}
                                    />
                                </div>
                                <div className="col-sm-1 my-5">
                                    <TbArrowsLeftRight size={45}/>
                                </div>
                                <div className="col-sm-5 bg-secondary d-flex flex-column p-3 rounded">
                                    <div className='d-flex'>
                                        To
                                        <FaPlaneArrival size={30} className='ms-auto'/>
                                    </div>
                                    <input 
                                        type='text'
                                        className='rounded p-2 my-4'
                                        onChange={handleAAChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row d-flex ms-5" style={{gap:'6em'}}>
                                <div className="col-sm-5 bg-secondary d-flex p-3 rounded" style={{gap:'7em'}}>
                                    <div className="col-sm-3">
                                        Aller prévu le
                                        <div className='my-2'>
                                            <input 
                                                type='date'
                                                className='rounded p-2'
                                                onChange={handleDDChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        Retour prévu le
                                        <div className='my-2'>
                                            <input 
                                                type='date'
                                                className='rounded p-2'
                                                onChange={handleADChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-5 bg-secondary d-flex justify-content-center flex-column p-3 rounded">
                                    Nombre de Passagers
                                    <input 
                                        type='number'
                                        className='rounded w-50 my-3'
                                        style={{marginLeft:'7em'}}
                                        onChange={handlePassengers}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <button type="submit" className="btn btn-outline-dark w-25"> Rechercher </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='d-flex flex-column my-5'>
                    <h1> 
                        {flights?.length > 0 ? `${flights?.length} Résultats` : 
                            <p className='fs-2 fw-bold'>Aucun résultat ne  correspond à votre recherche. Veuillez en effectuer une autre.</p>
                        }
                    </h1><br/>
                    {flights?.length > 0 && 
                        flights?.sort((a: Flight, b:Flight): number => { return (a.price - b.price); })
                        .map((fl: Flight) => <FlightCard key={fl.flightId} flight={fl} date={depDate} dateretour={arrDate} />)
                    }
                </div>
            </div>
        </section>
    );
}

export default FlightSearch;