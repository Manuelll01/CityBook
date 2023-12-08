"use client"
import useSWR from 'swr'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import {
    Box,
    Center,
    Flex
  } from '@chakra-ui/react'
import Link from 'next/link';
import CardPost from './CardPost';
import { MapComponent } from './MapComponent';

const fetcher = url => fetch(url).then(r => r.json())

const ListaOrase = (props) => {



    const {data: orase, error, isLoading} = useSWR(`https://geocoding-api.open-meteo.com/v1/search?name=${props.numeOras}&count=7&language=en&format=json`, fetcher)
    if (error) return <div><p>error... {error}</p></div>
    if (isLoading) return <div>loading...</div>
    console.log(orase);
    return(
        <Flex flexWrap={'wrap'} padding={'20px'}>
            {props.numeOras  !== '' && (
                <Flex flexWrap={'wrap'} padding={'20px'}>
                {orase.results === undefined ? (
                    <p>Nu am gasit nici un oras...</p>
                ) : (
                    orase.results.map((post, index) => (
                        <Box border={'1px solid black'} borderRadius={'40px'} padding={'10px 20px'} key={post.id} margin={'10px'}>
                            <Link href={'/' + post.name + '/' + post.id} >
                                <h1>Oras cu numarul {index + 1} din lista</h1>
                                <h2>Judet: {post.admin1}</h2>
                                <h2>Nume: {post.name}</h2>
                                <h2>Țară: {post.country}</h2>
                                <h2>Cod Țară: {post.country_code}</h2>
                                <h2>Populatie: {post.population ? post.population + ' de catateni' : 'populatia nu este cunoscuta' }</h2>
                                <h2>Latitudine: {post.latitude}</h2>
                                <h2>Longitudine: {post.longitude}</h2>
                                <h2>Elevatie: {post.elevation}</h2>
                                <h2>Fus orar: {post.timezone}</h2>

                            </Link>
                            <Box position={'relative'} height={'300px'} width={'300px'} >
                                <MapComponent latitude={post.latitude} longitude={post.longitude}/>
                            </Box>
                        </Box>
                        // <CardPost img={'/img/Rome.jpg'}/>  /*Aici o sa vina  */ pk.eyJ1IjoicGFjcGFjMDEiLCJhIjoiY2xwZnp3djRoMW1hcjJxcHJ3eXlncHYzNSJ9.9B7lRUlIb61vWGmYPMI1bg
                    ))
                )}
                </Flex>
            )}


        </Flex>
        
    )

}

export default ListaOrase