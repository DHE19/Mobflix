import type { NextPage } from 'next'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import requests from '../utils/requests'
import Row from '../components/Row'
import HeadHTML from '../components/Head'
import { modalState } from '../atoms/modalAtom'
import {useRecoilValue} from 'recoil'
import Modal from '../components/Modal'



const Home: NextPage<IFetchingData> = (props) => {
  const {horroMovies, actionMovies, topRated, comedyMovies, romanceMovies, documentaries, mobflixOriginals, trending} = props;
  const showModal = useRecoilValue(modalState)
  return (
    <section className=' h-screen bg-gradient-to-b lg:h-[140vh]'>
     <HeadHTML/>
      <Header/>
      
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner destacado={mobflixOriginals}/>
        <section className='md:space-y-12'>
          <Row title='Trendind Now' movies={trending}/>
          <Row title='Top Rated' movies={topRated}/>
          <Row title='Action Thrillers' movies={actionMovies}/>
          <Row title='Scary' movies={horroMovies}/>
          <Row title='Comedy' movies={comedyMovies}/>
          <Row title='Romance' movies={romanceMovies}/>
          <Row title='Documentaries' movies={documentaries}/>
        </section>
      </main>
      
      {showModal ? <Modal/> : null}
    </section>
  )
}

export default Home



export const getServerSideProps:GetServerSideProps<IFetchingData> = async() =>{
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      mobflixOriginals: netflixOriginals.results,
      trending: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horroMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
