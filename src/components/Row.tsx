
import {ChevronRightIcon,ChevronLeftIcon} from '@heroicons/react/24/solid'
import { useRef, useState } from 'react';
import Thumbnail from './Thumbnail';

interface IProps {
    title:string;
    movies:IMovie[];
    //movue:IMovie[] | DocumentData[]
}

const Row:React.FC<IProps> = ({title,movies}) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const  handleClick = (direciton:string) =>{
        setIsMoved(true);
        // si tiene valor
        if(rowRef.current) {
            //obtenemos scrollLeft y su ancho
            const {scrollLeft, clientWidth} = rowRef.current;
            const scrollTo = direciton === 'left' ?
                scrollLeft - clientWidth : 
                scrollLeft + clientWidth;
            
                rowRef.current.scrollTo({left:scrollTo, behavior:'smooth'})

        }
    }
    return (
        <div className=' flex flex-col h-40 space-y-1 md:space-y-2 '>
            <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'
            >{title}</h2>
            <div className='group relative md:-ml-2'>
                <ChevronLeftIcon
                onClick={() => handleClick('left')}
                className={`arrow left-2`}/>
                <div ref={rowRef} className='flex items-center gap-1 overflow-x-scroll md:space-x-3 md:p-2 scrollbar-hide'>
                    {
                        movies.map(i => (
                            <Thumbnail key={i.id} name={i.name ?? i.title} image={i.backdrop_path ?? i.poster_path} description={i.overview}/>
                        ))
                    }
                </div>
                <ChevronRightIcon 
                onClick={ () => handleClick('right')}
                className={`arrow right-2`}/>
            </div>
        </div>
    )
}

export default Row
