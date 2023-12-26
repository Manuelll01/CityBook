"use client"
import useSWR, { mutate } from 'swr'
import { useParams } from 'next/navigation'
import { Box, Center, Flex, Grid, Heading  } from '@chakra-ui/react';
import { MapComponent } from '@/components/MapComponent';
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react'

const fetcher = url => fetch(url).then(r => r.json())

const Oras = () => {
  const params = useParams()
  const { name, idOras } = params;
  const [selectedOras, setSelectedOras] = useState()
  const [airQuality, setAirQuality] = useState()

  const handleAddPost = async (nume, id, provincie, tara, latitudine, longitudine) => {
    try {
      const response = await fetch('/api/addPost', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityName: nume,
          cityId: id,
          cityProvince: provincie,
          cityCountry: tara,
          cityLatitude: latitudine,
          cityLongitude: longitudine
        }),
     }); 
     mutate(`http://localhost:3000/api/saved`);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch('/api/deletePost', {
         method: 'DELETE',
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityId: id
        }),
     }); 
     mutate(`http://localhost:3000/api/saved`);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  const {data: favourites, error3, isLoading3} = useSWR(`http://localhost:3000/api/saved`, fetcher)
  const { data: orase, error, isLoading} = useSWR(
    `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=en&format=json`,
    fetcher
  );
    
  const { data: api2, error: error2 } = useSWR(
    selectedOras ? `https://api.open-meteo.com/v1/forecast?latitude=${selectedOras.latitude}&longitude=${selectedOras.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,rain,cloud_cover&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation_probability,rain,cloud_cover` : null,
    fetcher
  );
 
  useEffect(() => {
    const makeSecondAPICall = async () => {
      try {
        const selectedOras1 = await orase.results.find((oras) => oras.id == idOras);
 
        const response = await fetcher(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedOras1.latitude}&longitude=${selectedOras1.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,rain,cloud_cover&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation_probability,rain,cloud_cover`
          );
          setSelectedOras(response)
        const response2 = await fetcher(`https://api.waqi.info/feed/geo:${selectedOras1.latitude};${selectedOras1.longitude}/?token=f1235b864598db150bffca6ba1bf293fe02d2736`)
        setAirQuality(response2)
        
      } catch (error) {
        console.error('Error making second API call:', error);
      }
    };

    if (orase && orase.results.length > 0) {
      makeSecondAPICall();
    }
  }, [orase]);

  const getAirQualityText = (value) => {
    if (value >= 0 && value <= 50) {
      return 'Bun';
    } else if (value >= 51 && value <= 100) {
      return 'Moderat';
    } else if (value >= 101 && value <= 150) {
      return 'Nesanatos pentru grupele sensibile';
    } else if (value >= 151 && value <= 200) {
      return 'Nesanatos';
    } else if (value >= 201 && value <= 300) {
      return 'Foarte nesanatos';
    } else {
      return 'Periculos';
    }
  };
  if (error) return <div><p>error... {error}</p></div>
  if (error2) return <div><p>error2... {error2}</p></div>
  if (error3) return <div><p>error2... {error3}</p></div>
  if (isLoading && isLoading3) return <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>
  if (!favourites || favourites.length === 0) {
    return <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>;
  }
  if (!airQuality || favourites.length === 0) return <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>
  return (
    <Box padding={{base: "20px 10px", sm: '25px', md: '25px 50px', xl: '25px 75px'}} backgroundImage={'url(/img/mountains.jpg) '} backgroundSize={'cover'} color={'white'} minHeight={'100vh'}>
      
      {orase.results.map((oras) => {
        if(oras.id == idOras){
          return(
            <Flex flexDir={{base: 'column', lg: 'row'}} key={oras.id} justifyContent={'space-between'} gap={'10px'}>
              <Box flexGrow={'1'}>
                <Center fontSize={'1.5rem'} fontWeight={'600'}>
                  <h2>{oras.admin1}/</h2>
                  <h2>{oras.name}</h2>
                </Center>
                
                <Flex flexDir={'column'} justifyContent={'space-between'} height={'100%'} paddingBottom={'25px'}>
                  <Flex flexDir={{base: 'column', lg: 'row'}} justifyContent={'space-between'} fontSize={'1.25rem'}>
                    <Box padding={'15px'} height={'100%'}>
                      <h2>Țară: {oras.country}</h2>
                      <h2>Populatie: {oras.population ? oras.population + ' de catateni' : 'populatia nu este cunoscuta' }</h2>
                      <h2>Fus orar: {oras.timezone}</h2>
                      <h2>Cod Țară: {oras.country_code}</h2>
                      <h2>Altitudine: {oras.elevation} metrii deasupra nivelului mării.</h2>
                      {airQuality.data.iaqi.pm25  && airQuality.data.iaqi.pm25.v ?
                         <p>Calitatea aerului: {getAirQualityText(airQuality.data.iaqi.pm25.v) } ({airQuality.data.iaqi.pm25.v})</p>
                         : 'Din pacate nu avem la Dispozitie calitatea aerului acestui oras'}
                    </Box>

                      {selectedOras   && (
                        <Box padding={'15px'}>
                              <h1>Current weather</h1>
                              <p>Elevation at 2m: {selectedOras.elevation}</p>
                              <p>Temperatura: {selectedOras.current.temperature_2m } {selectedOras.current_units.temperature_2m}</p>
                              <p>Temperatura resimțită: {selectedOras.current.apparent_temperature } {selectedOras.current_units.apparent_temperature}</p>
                              <p>Viteza vantului: {selectedOras.current.wind_speed_10m } {selectedOras.current_units.wind_speed_10m}</p>
                        </Box>
                      )}
                      
                  </Flex>
                  
                  <Flex justifyContent={'space-between'} >
                    <Heading>Future weather predictions</Heading>
                    
                    {favourites.find((oras) => oras.cityId == idOras) ? <Box onClick={() => handleDeletePost(oras.id)} fontSize={{base: '2rem', xl: '3rem'}} cursor={'pointer'}> <GoBookmarkFill /> </Box> 
                    : <Box onClick={() => handleAddPost(oras.name, oras.id, oras.admin1, oras.country, oras.latitude, oras.longitude)} fontSize={{base: '2rem', xl: '3rem'}} cursor={'pointer'}> <GoBookmark />  </Box>}
                  </Flex>
                </Flex>
              </Box>
              <Box position={'relative'} height={{base: '300px', lg: '600px'}} width={{base: '100%', lg: '400px'}}>
                                <MapComponent latitude={oras.latitude} longitude={oras.longitude}/>
              </Box>

            </Flex>
          )
        }
      })}
      {selectedOras   && (
        <Box>
              
            <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr ", xl: "1fr 1fr 1fr " }} padding={'20px 0'} gap={'10px'}>
              
              {selectedOras.hourly.time.map((time, index) => {
                if (index % 24 === 12 && index >= 24) {
                  return (
                    <Box key={index}  padding={'25px 15px'} backgroundColor={'rgba(29, 27, 28, 0.65)'} color={'white'} borderRadius={'10px'}>
                      <p>Data: {time.split('T12:00')}</p>
                      <p>Temperatura: {selectedOras.hourly.temperature_2m[index]} {selectedOras.hourly_units.temperature_2m}</p>
                      <p>Temperatura resimțită: {selectedOras.hourly.apparent_temperature[index] } {selectedOras.hourly_units.apparent_temperature}</p>
                      <p>Viteza vantului: {selectedOras.hourly.wind_speed_10m[index]} {selectedOras.hourly_units.wind_speed_10m}</p>
                      <p>Gradul de acoperire a norilor: {selectedOras.hourly.cloud_cover[index]} {selectedOras.hourly_units.cloud_cover}</p>
                      <p>Gradul de probabilitate a precipitațiilor: {selectedOras.hourly.precipitation_probability[index]} {selectedOras.hourly_units.precipitation_probability}</p>
                      <p>Umiditatea: {selectedOras.hourly.relative_humidity_2m[index]} {selectedOras.hourly_units.relative_humidity_2m}</p>
                     
                    </Box>
                  );
                }
                return null;
              })}
            </Grid>

        </Box>
      )}
    </Box>
  );
};

export default Oras;