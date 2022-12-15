
import {PlayIcon,InformationCircleIcon} from '@heroicons/react/24/solid'
import Image from "next/legacy/image"
import { useEffect, useState } from "react";
import { BASE_URL_IMAGE } from "../constants/movies";


interface IProps{
    destacado: IMovie[]
}

const Banner:React.FC<IProps> = ({destacado}) => {
    const [movie, setMovie] = useState<IMovie | null>();

    
    useEffect(() => {
        setMovie(destacado[Math.floor(Math.random()* destacado.length)]);
    }, [destacado])
    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className=" absolute top-0 -z-10 left-0 h-[95vh] w-screen">
                <Image 
                src={`${BASE_URL_IMAGE}${movie?.backdrop_path || movie?.poster_path}`}
                layout='fill'
                objectFit="cover"
                alt={""}/>
            </div>
            <div className='flex flex-col gap-5 '>
                <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">{movie?.title || movie?.name || movie?.original_name}</h1>
                <p className="max-w-xs text-xs md:max-w-md md:text-lg lg:max-w-2xl lg:text-xl">{movie?.overview.split('').map((i,index) => index < 150 ? i: null).join('')}...</p>

                <div className='flex gap-5'>
                    <button className="bannerButton bg-white text-black"><PlayIcon className='w-4 h-4 text-black md:h-7 md:w-7'/> Play</button>
                    <button className="bannerButton bg-[gray]/50"><InformationCircleIcon className='w-4 h-4 text-white md:h-7 md:w-7'/>More Info</button>
                </div>
            </div>
        </div>
    )
}

export default Banner
