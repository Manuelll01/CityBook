// import HeroSection from "@/components/HeroSection";
import { MapComponent } from '@/components/MapComponent';
import { Box, Center, Flex, Grid, Heading, Spinner } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

  const city_names = ["Paris","London","Berlin","Madrid","Rome","Amsterdam","Prague","Vienna","Barcelona","Athens","Warsaw","Lisbon","Stockholm",
  "Budapest","Dublin","Oslo","Copenhagen","Helsinki","Brussels","Zurich",
  "Edinburgh", "Manchester", "Milan", "Naples", "Venice", "Porto", "Gothenburg", "St. Petersburg", "Moscow", "Kiev", "Bruges",
  "Munich", "Hamburg", "Cologne", "Frankfurt", "Lyon", "Marseille", "Nice", "Zagreb", "Dubrovnik", "Bucharest", "Krakow",

  "Tokyo","Beijing","Seoul","Shanghai","Bangkok","Hong Kong","Singapore","Taipei","Mumbai","Jakarta","Manila","Hanoi","Seoul","Kuala Lumpur",
  "Osaka","Ho Chi Minh City","Busan","Kyoto","Ulaanbaatar","Phnom Penh",
  "Taichung", "Mumbai", "Delhi", "Bangalore", "Chennai", "Surabaya", "Bandung", "Quezon City",

  "New York","Los Angeles","Toronto","Mexico City","Vancouver","Rio de Janeiro","Buenos Aires","Montreal","Chicago","Seattle","San Francisco","Dallas",
  "Miami","Denver","Santiago","Lima","Bogotá","Houston","Panama City","San Diego"
]

const HeroSection = dynamic(() => import('../components/HeroSection'), {
  loading: () => <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>,
  ssr: false, // Set to false to render on the client side
});

const Cauta = dynamic(() => import('../app/cauta/page'), {
  loading: () => <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>,
  ssr: false, // Set to false to render on the client side
});

const favorite = dynamic(() => import('../app/favorite/page'), {
  loading: () => <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>,
  ssr: false, // Set to false to render on the client side
});



async function fetchFiveFavorite() {
  
  const fiveFavoriteResponse = await fetch("http://localhost:3000/api/fiveFavoritePosts",{
      cache: 'no-cache'
  })

  return fiveFavoriteResponse.json();
}

async function test(){
  try {
    const randomCities = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * city_names.length);
    const cityName = city_names[randomIndex];

    const data = await fetchRandomCitiesData(cityName);
    randomCities.push(data.results[0]);
  }
  return randomCities
  } catch (error) {
    console.error('eroare la fetch 5 orase random: ', error)
  }
  
}

async function fetchRandomCitiesData(randomName) {
  
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${randomName}&count=1&language=en&format=json`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data for ${randomName}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};



export default async function Home() {
  const fiveFavoriteResponse = await fetchFiveFavorite();
  const fiveRandomCitiesResponse = await test();

    console.log(fiveRandomCitiesResponse);
    console.log(fiveFavoriteResponse);
  return (
   <div>
      <HeroSection/>
      
      <Box>
        <Center><Heading>Orașe Preferate</Heading></Center>
        <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr 1fr" }} padding={'20px'}>
          {fiveFavoriteResponse.map(favorit => (
            <Box key={favorit.cityId}>              
                <Box   border={'1px solid black'} overflow={'hidden'} borderRadius={'15px'} margin={'10px'}>
                    <Box position={'relative'}  width={'100%'} aspectRatio={'7/5'}>
                        <MapComponent latitude={favorit.cityLatitude} longitude={favorit.cityLongitude}/>
                    </Box>
                    <Box padding={'5px 15px'}>
                        <Box  >
                            <Link href={'/' + favorit.cityName + '/' + favorit.cityId} >{favorit.cityProvince}, {favorit.cityName}, {favorit.cityCountry}</Link>
                            
                        </Box>
                    </Box>
                </Box>
            </Box>
            
          ))}
        </Grid>
        <Box>
          <Center><Heading>Orașe Random</Heading></Center>
          <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr 1fr" }} padding={'20px'}>
            {fiveRandomCitiesResponse.map(random => (
              <Box key={random.id}>              
                  <Box   border={'1px solid black'} overflow={'hidden'} borderRadius={'15px'} margin={'10px'}>
                      <Box position={'relative'}  width={'100%'} aspectRatio={'7/5'}>
                          <MapComponent latitude={random.latitude} longitude={random.longitude}/>
                      </Box>
                      <Box padding={'5px 15px'}>
                          <Box  >
                              <Link href={'/' + random.name + '/' + random.id} >{random.admin1}, {random.name}, {random.country}</Link>
                              
                          </Box>
                      </Box>
                  </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

   </div>
  )
}
