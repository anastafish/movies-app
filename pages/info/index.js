import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import {ClipLoader} from 'react-spinners'
import YouTube from 'react-youtube';
import arrow from '../../images/arrow.svg'
import Link from 'next/link';
import {motion} from 'framer-motion'

export default function Info() {
    const router = useRouter()
    const title = router.query.title
    const [movie, setMovie] = useState({}) 
    const [bg, setBg] = useState({})
    const [ytId, setYtId] = useState('')

    const opts = {
      height: '280',
      width: '400',
      playerVars: {
        autoplay: 1,
      },
    };

    async function getMovie() {
      if (title) {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=95ad5639`)
        const data = await response.json()
        setMovie(data)

        const imdbId = data.imdbID
        const trailerRes = await fetch(`/api/hello?id=${imdbId}`)
        const trailerData = await trailerRes.json()
        if (trailerData.trailer){
          setYtId(trailerData.trailer.youtube_video_id)          
        }
      }
    }

    useEffect(() => {
        getMovie()
    }, [title])

  return (
    <div className={`flex flex-col items-center justify-around my-10 ${!movie.Title && 'h-[100vh]'}`}>
      <Head>
        <title>{movie.Title}</title>
      </Head>
      {movie.Title && <div className='w-full h-full flex flex-col items-center justify-around'>
        <div className='flex flex-col gap-5 items-center justify-center relative w-full'>
          <Link href='/'>
            <Image
              src={arrow}
              width={50}
              height={50}
              alt='back'
              className='absolute top-0 left-10'
              />
          </Link>
          <h1 className='sm:text-[40px] text-[20px] font-bold font-mono text-center'>{movie.Title}</h1>
          <motion.div 
          className='flex sm:flex-row flex-col
            border-[2px] border-black rounded-md
            sm:items-stretch items-center'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:.1, duration:1.5}}
          >
            {movie.Poster && movie.Poster != "N/A" &&
            <Image
            src={movie.Poster}
            width={350}
            height={350}
            alt='movie_img'
            />
            }
                    <div className='flex flex-col
                     items-center justify-evenly w-full p-5 gap-3
                     '>
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
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-center font-bold '>Story</h1>
              <h1 className='text-center max-w-[400px]'>{movie.Plot}</h1>
            </div>
                    </div>
                    </motion.div>
          </div>
        {ytId && 
        <div className='flex flex-col items-center justify-center w-full h-full my-10'>
          <h1 className='sm:text-[50px] text-[30px] font-bold font-mono'>Trailer</h1>
          <YouTube
            videoId={ytId} 
            opts={opts} 
            onReady={(e) => e.target.pauseVideo()}
            />
        </div>
        }
      </div>}
      {movie.Error && <h1 className='text-[40px]'>Movie Not found</h1>}
      {!movie.Error && !movie.Title && <ClipLoader />}
    </div>
  )
}
