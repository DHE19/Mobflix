import {useRecoilState} from 'recoil'
import {HandThumbUpIcon, PlayIcon, PlusIcon, SpeakerWaveIcon, SpeakerXMarkIcon, } from '@heroicons/react/24/solid'
import MuiModal from '@mui/material/Modal'
import { modalState, movieState} from '../atoms/modalAtom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'



const Modal = () => {
    const [showModal,setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<IGenre[]>();
    const [muted, setMuted] = useState(true);
    const handleClose = () =>{
        setShowModal(false);
    }
    
    useEffect(() =>{
        if(!movie) return;
        const movieType = movie.media_type === 'tv' ? 'tv' :'movie';
        const url = `https://api.themoviedb.org/3/${movieType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&append_to_response=videos`
        
            //TODO:CORREGIR LIO EN LA CLAVE
         const fetchMovie = async () =>{
            const data = await fetch(url).then((response) => response.json());
            if (data?.videos) {
                const index = data.videos.results.findIndex(
                  (element: IElement) => element.type === 'Trailer'
                )
                setTrailer(data.videos?.results[index]?.key)
              }
              if (data?.genres) {
                setGenres(data.genres)
              }
        }

        fetchMovie();
    },[movie])

    
    return (
        <MuiModal open={showModal} onClose={handleClose} className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'>
            <>
                <button onClick={handleClose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
                    <XMarkIcon className="h-6 w-6"/>
                </button>

                <div className='relative pt-[56.25%]'>
                    <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer}`}
                    width="100%"
                    height="100%"
                    style={{position:'absolute',top:'0',left:'0'}}
                    playing
                    muted={muted}/>
                
                <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                    <div className='flex space-x-2'>
                        <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg[#e6e6e6]'>
                            <PlayIcon className='h-7 w-7 text-black'/>
                            Play
                        </button>

                        <button className='modalButton'>
                            <PlusIcon className='h-7 w-7 '/>
                        </button>
                        <button className='modalButton'>
                            <HandThumbUpIcon className='h-7 w-7 '/>
                        </button>
                    </div>
                        <button className='modalButton'
                        onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                               <SpeakerXMarkIcon className='h-7 w-7 '/> 
                            ):(
                                <SpeakerWaveIcon className='h-7 w-7 '/>
                            )}
                        </button>
                    </div>  
                </div>

                <div className='flex flex-col space-y-6 rounded-b-md bg-[#181818] px-6 py-4'>
                    <div className=' space-y-6 text-lg'>
                        <div className=' flex items-center space-x-2 text-sm'>
                            <p className='font-semibold text-green-400'>{(movie?.vote_avarage ?? 0)  * 10}% Match</p>
                            <p className='font-light'>{movie?.release_date ?? movie?.first_air_date}</p>
                            <div className='flex h-4 items-center justify-center rounded border border-white/40 px-2 text-sm'>HD</div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-x-6 gap-y-4 font-light md:flex-row items-center'>
                        <p className='w-5/6'>{movie?.overview}</p>
                        <div className='flex flex-col space-y-3 text-sm'>
                            <div>
                                <span className='text-[gray]'>Genres: </span>
                                {genres?.map(i => i.name).join(', ')}
                            </div>
                            <div>
                                <span className='text-[gray]'>Original Language:</span>
                                {movie?.original_language}
                            </div>
                            <div>
                                <span className='text-[gray]'>Total Votes:</span>
                                {movie?.vote_count}
                            </div>
                        </div>
                    </div>
                </div>
                

            </>
        </MuiModal>
    )
}

export default Modal
