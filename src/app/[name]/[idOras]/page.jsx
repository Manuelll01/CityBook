"use client"
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { Box } from '@chakra-ui/react';
import { MapComponent } from '@/components/MapComponent';

const fetcher = url => fetch(url).then(r => r.json())

const Oras =  () => {
  const params = useParams()
  const { name, idOras } = params;
  
  const {data: orase, error, isLoading} = useSWR(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=7&language=en&format=json`, fetcher)
  const {data: api2, error2, isLoading2} = useSWR("https://api.teleport.org/api/cities/?search=Berlin&limit=5", fetcher)
  console.log(api2);
  // console.log(orase);
  // console.log(params);
  if (error) return <div><p>error... {error}</p></div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>
      {orase.results.map((oras) => {
        if(oras.id == idOras){
          return(
            <div key={oras.id}>
              <h1>id: {oras.id}</h1>
              <h2>Judet: {oras.admin1}</h2>
              <h2>Nume: {oras.name}</h2>
              <h2>Țară: {oras.country}</h2>
              <h2>Cod Țară: {oras.country_code}</h2>
              <h2>Populatie: {oras.population ? oras.population + ' de catateni' : 'populatia nu este cunoscuta' }</h2>
              <h2>Latitudine: {oras.latitude}</h2>
              <h2>Longitudine: {oras.longitude}</h2>
              <h2>Elevatie: {oras.elevation}</h2>
              <h2>Fus orar: {oras.timezone}</h2>
              <Box position={'relative'} height={'300px'} width={'300px'} >
                                <MapComponent latitude={oras.latitude} longitude={oras.longitude}/>
              </Box>
            </div>
          )
        }
      })}
      <p>{name}</p>
      <p>{idOras}</p>
    </div>
  );
};

export default Oras;