
import Image from "next/legacy/image"

interface IProps{
    image:string,
    name:string,
    description:string;

}

const Thumbnail:React.FC<IProps> = ({image,name,description}) => (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image  src={`https://image.tmdb.org/t/p/w500${image}`}
        className='rounded-sm object-cover md:rounded'
        layout="fill"
        />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center">
            <h1 className={`mb-3 font-semibold text-center ${name.split(' ').length < 3 ? 'text-sm' :'text-xs'} px-1`}>{name}</h1>
        </div>
    </div>
)

export default Thumbnail
