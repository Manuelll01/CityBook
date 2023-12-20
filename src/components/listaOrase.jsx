"use client"
import useSWR, { mutate } from 'swr'
import React, { useEffect, useState } from 'react';
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { Spinner } from '@chakra-ui/react'
import {
    Box,
    Center,
    Flex,
    Grid
  } from '@chakra-ui/react'
import Link from 'next/link';
import { MapComponent } from './MapComponent';

const fetcher = url => fetch(url).then(r => r.json())

const ListaOrase = (props) => {

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

    const {data: orase, error, isLoading} = useSWR(`https://geocoding-api.open-meteo.com/v1/search?name=${props.numeOras}&count=5&language=en&format=json`, fetcher)
    const {data: favourites, error2, isLoading2} = useSWR(`http://localhost:3000/api/saved`, fetcher)
    if (error) return <div><p>error... {error}</p></div>
    if (error2) return <div><p>error2... {error2}</p></div>
    if (isLoading) return <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>
    if (isLoading2) return <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>

    if (!favourites || favourites.length === 0) {
        return <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>;
      }

    const cityIds = favourites.map(favourite => favourite.cityId);
    return(
        <Box >  
            {props.numeOras  !== '' && (
                <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr 1fr" }} padding={'20px'}>
                {orase.results === undefined ? (
                    <p>Nu am gasit nici un oras...</p>
                ) : (
                    orase.results.map((post, index) => (
                        <Box>
                            
                            <Box  key={post.id} border={'1px solid black'} overflow={'hidden'} borderRadius={'15px'} margin={'10px'}>
                                <Box position={'relative'}  width={'100%'} aspectRatio={'7/5'}>
                                    <MapComponent latitude={post.latitude} longitude={post.longitude}/>
                                </Box>
                                <Box padding={'5px 15px'}>
                                    <Box  >
                                        <Link href={'/' + post.name + '/' + post.id} >{post.admin1}, {post.name}, {post.country}</Link>
                                        <Flex fontSize={'1.5rem'} justifyContent={'flex-end'} paddingTop={'5px'}>  
                                             {cityIds.includes((post.id).toString()) ? <Box  onClick={() => handleDeletePost(post.id)} cursor={'pointer'}><GoBookmarkFill /></Box>
                                             : <Box onClick={() => handleAddPost(post.name, post.id, post.admin1, post.country, post.latitude, post.longitude)} cursor={'pointer'}><GoBookmark /></Box>}
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        
                       
                    ))
                )}
                </Grid>
            )}

        </Box>
        
    )

}

export default ListaOrase