import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import {ClipLoader} from 'react-spinners'

export default function Info() {
    const router = useRouter()
    const title = router.query.title
    const [movie, setMovie] = useState({}) 

    async function getMovie() {
      if (title) {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=95ad5639`)
        const data = await response.json()
        console.log(data)
        setMovie(data)
      }
    }

    useEffect(() => {
        getMovie()
    }, [title])

  return (
    <div className='flex flex-col items-center justify-around h-[100vh]'>
      <Head>
        <title>{movie.Title}</title>
      </Head>
      {movie.Title ? <div className='w-full h-full flex flex-col items-center justify-around'>
        <div className='flex flex-col gap-5 items-center justify-center'>
          <h1 className='sm:text-[40px] text-[20px] font-bold font-mono'>{movie.Title}</h1>
          {movie.Poster &&
          <Image
          src={movie.Poster}
          width={250}
          height={250}
          alt='movie_img'
          className='rounded-md'
          />
          }
        </div>
        <div className='flex sm:flex-row flex-col
         items-center justify-evenly w-full p-5 gap-3'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold'>Country</h1>
            <h1 className='text-center'>{movie.Country}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold'>Genre</h1>
            <h1 className='text-center'>{movie.Genre}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold'>Langauge</h1>
            <h1 className='text-center'>{movie.Language}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold'>Movie Length</h1>
            <h1 className='text-center'>{movie.Runtime}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold'>Year</h1>
            <h1 className='text-center'>{movie.Year}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold'>Imdb Rating</h1>
            <h1 className='text-center'>{movie.imdbRating}</h1>
          </div>
        </div>
      </div> : <ClipLoader />}
    </div>
  )
}
