interface IFetchingData  {
    mobflixOriginals:IMovie[];
    trending:IMovie[];
    topRated:IMovie[];
    actionMovies:IMovie[];
    comedyMovies:IMovie[];
    horroMovies:IMovie[];
    romanceMovies:IMovie[];
    documentaries:IMovie[];
  
  }

interface IGenre{
    id:number;
    name:string;
}

interface IMovie {
    title:string;
    backdrop_path:string;
    media_type?:string;
    release_date?:string;
    first_air_date?:string;
    genre_ids:number[];
    id:number;
    name:string;
    origin_country:string[];
    original_language:string;
    overview:string;
    popularity:number;
    poster_path:string;
    vote_avarage:number;
    vote_count:number;
    original_name:string;
}

interface IElement {
    type:'Boopers'| 'Features'|'Behind the Scenes' |'Clip' |'Trailer'|'Teaser'
}