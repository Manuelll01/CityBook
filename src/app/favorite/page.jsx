
import { MapComponent } from "@/components/MapComponent";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import Link from "next/link";

async function fetchFavorite() {
    const favoriteResponse = await fetch("http://localhost:3000/api/saved",{
        cache: 'no-cache'
    })

    return favoriteResponse.json();
}

export default async function Favourites(){
    const oraseFavorite = await fetchFavorite();

    console.log(oraseFavorite);

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '15px', padding: '10px 20px' }}>
                {oraseFavorite.map((oras) => (
                    
                    <Box display={'inline-block'}>
                        <Box  key={oras.cityId} border={'1px solid black'} overflow={'hidden'} borderRadius={'15px'} margin={'10px'}>
                            <Box position={'relative'}  width={'350px'} aspectRatio={'7/5'}>
                                <MapComponent latitude={oras.cityLatitude} longitude={oras.cityLongitude}/>
                            </Box>
                            <Flex padding={'10px'} justifyContent={'center'} background={'White'}>
                                <Link href={'/' + oras.cityName + '/' + oras.cityId} padding={'5px 15px'}>{oras.cityProvince}, {oras.cityName}, {oras.cityCountry}</Link>
                            </Flex>
                        </Box>
                    </Box>
                    ))}
        </div>
    )
}
