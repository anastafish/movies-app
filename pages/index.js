import { useEffect, useState } from "react";
import {default_movies} from '../data'
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

export default function Home() {

  const [movie, setMovie] = useState('')
  const router = useRouter()

  function handleChange(e) {
    setMovie(e.target.value)
  }


  function handleSubmit(e) {
    if (e.key === 'Enter') {
      router.push(`/info?title=${movie}`)
    }
  }

  return (    
    <div className="flex flex-col items-center justify-center p-5 gap-5 bg-gray-400">
      <Head>
        <title>Movies App</title>
      </Head>
      <h1 className="text-[40px]">Movies App</h1>
      <input type="text" value={movie} onChange={handleChange} onKeyDown={handleSubmit}/>
      <div className="flex items-center justify-center flex-wrap">
        {default_movies.map((movie, index) => {
          return(
           <div key={index} className="flex flex-col items-center justify-center">
            <a href={`/info?title=${movie.title}`}>
              <Image
                src={movie.image.url}
                alt="movie_img"
                width={230}
                height={230}
                className="p-1"
                />
            </a>
          </div>
          )
        })}
      </div>
    </div>
  )
}
