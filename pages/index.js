import { useEffect, useState } from "react";
import {default_movies} from '../data'
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { Autocomplete, TextField, Button } from "@mui/material";
import search from '../images/search.svg'
import movieIcon from '../images/movie.svg'
import { motion } from 'framer-motion'



export default function Home() {

  const [movie, setMovie] = useState('')
  const [moveiValue, setMovieValue] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const router = useRouter()


  async function searchSuggestion(query) {
    const res = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=95ad5639`)
    const data = await res.json()
    if (data.Title && !suggestion.includes(data.Title)) {
      setSuggestion(prevState => [data.Title, ...prevState])
    }
  }

  function handleSubmit(e, movie) {
    if (e.key === 'Enter' && movie) {
      router.push(`/info?title=${movie}`)
    }
  }

  return (    
    <div className="flex flex-col items-center justify-center p-5 gap-5 bg-gray-400
                    overflow-y-hidden
    ">
      <Head>
        <title>Movies App</title>
      </Head>
      <div className="flex flex-col items-center justify-center gap-5 w-full">
      <div className="flex gap-3 items-center justify-center">
        <h1 className="text-[40px] font-bold">Movies App</h1>
        <Image src={movieIcon}/>
      </div>
      <div className="flex items-center justify-center self-center">
        <Autocomplete
          id="combo-box-demo"
          options={suggestion.slice(0,5)}
          value={movie}
          size="small"
          onChange={(e, newValue) => {
            setMovie(newValue)
            handleSubmit(e, newValue)
          }}
          freeSolo
          inputValue={moveiValue}
          onInputChange={(e, newInputValue) => {
            setMovieValue(newInputValue)
            searchSuggestion(newInputValue)
          }}
          sx={{ width: 300, backgroundColor:'white', borderRadius:'10px', border:'none' }}
          renderInput={(params) => <TextField {...params} placeholder="Search for Any movie" />}
          filterOptions={(x) => x}
        />
        <Image
           onClick={() => moveiValue && router.push(`/info?title=${moveiValue}`)}
           src={search}
           width={35}
           height={35}
           style={{cursor:'pointer'}}
           />
      </div>
      </div>
      <div className="flex items-center justify-center flex-wrap">
        {default_movies.map((movie, index) => {
          return(
           <motion.div 
           animate={{x:[2000,0]}}
           transition={{delay:0.2*index, duration:1}}
           initial={{x:2000}}
           key={index} 
           style={{cursor:'pointer'}}
           className="flex flex-col items-center justify-center"
           >              
            <Link href={`/info?title=${movie.title}`}>
              <Image
                src={movie.image.url}
                alt="movie_img"
                width={230}
                height={230}
                className="p-1"
                />
            </Link>
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
