import Header from "../usefulComponents/Header";
import {useState, useEffect} from 'react';
import axios from "axios";

const Page4: React.FC = () => {
    const [listData, setListData] = useState([]);

    // useEffect(() => {
    //     let moviesId = (window.localStorage.movies ? window.localStorage.movies.split(",") : []);
        
    //     for(let i=0; i < moviesId.length; i++){
    //         axios.get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=5858ee6eb60999e939c81351b632d815&language=fr-FR`)
    //         .then((res) => setListData((listData) => [...listData, res.data]));
    //     }
    // },[])

    return(
        <div className="container text-center">
           {/* <Header/>
           <h2>Favoris<span>❤️</span></h2>
           <div className="result">
            {listData.length > 0 ? (listData.map((movie) => {
                return (<Card mov={movie} key={movie.id}/>)
            })) : <h1>No favorites for the moment...</h1>}
           </div> */}<h1 className="fs-2 my-5">No favoris for the moment...</h1>
        </div>
    );
};

export default Page4;