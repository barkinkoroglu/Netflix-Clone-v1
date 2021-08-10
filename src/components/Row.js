import React, { useEffect, useState } from 'react' //rfce
import axios from './../axios'
import "./Row.css"
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    useEffect(()=>{
        const fetchData = async () =>{
            const request = await axios.get(fetchUrl)
            //https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
            //console.log(request.data.results)
            setMovies(request.data.results)
            return request
        }
        fetchData();
    },[fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
         playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("")
        }else{
            movieTrailer(movie?.name || "")
            .then((url)=>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
                console.log(movie)
                //console.log(urlParams.get("v"))
            })
            .catch((error)=>console.log(error))
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={`row__posters ${isLargeRow && "row__posterLarge" }`}>
                {movies.map((movie)=>{
                    return (
                        <img 
                        key={movie.id} 
                        className = "row__poster"
                        onClick ={()=> handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path }`} alt={movie.name}/>
                    )
                    
                })}
            </div>
           {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts} />}
        </div>
    )
}

export default Row
