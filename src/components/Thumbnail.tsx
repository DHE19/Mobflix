
import Image from "next/legacy/image"
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface IProps{
   movie:IMovie;

}


///REVISA TODO EL DESMADRE QUE TIENE QUE VER CON RECOIL!!!! (INDEX THUBNAIL BANNER Y MODAL)


const Thumbnail:React.FC<IProps> = ({movie}) => {
    const [,setShowModal] = useRecoilState(modalState);
    const [,setCurrentMovie] = useRecoilState(movieState);
    
    return (
    <div 
    onClick={() =>{
        setCurrentMovie(movie);
        setShowModal(true);
    }}
    className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ?? movie.poster_path}`}
        className='rounded-sm object-cover md:rounded'
        layout="fill"
        />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center">
            <h1 className={`mb-3 font-semibold text-center ${(movie.name ?? movie.title).split(' ').length < 3 ? 'text-sm' :'text-xs'} px-1`}>{(movie.name ?? movie.title)}</h1>
        </div>
    </div>
)}

export default Thumbnail
