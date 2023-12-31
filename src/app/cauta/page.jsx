"use client"
import useSWR from 'swr'
import { CiSearch } from "react-icons/ci";
import {
    Box,
    Center,
    Flex,
    Input,
} from '@chakra-ui/react'
import ListaOrase from '@/components/listaOrase';
import { useState } from 'react';
import Link from 'next/link';


import HeroSection2 from '@/components/HeroSection2';

// const HeroSection2 = dynamic(() => import('../../components/HeroSection2'), {
//     loading: () => <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'}><Spinner width={'150px'} height={'150px'} thickness="10px"/></Flex>,
//     ssr: false, // Set to false to render on the client side
//   });

const fetcher = url => fetch(url).then(r => r.json())

export default function Search(){
    const [ continutInput, setContinutInput ] = useState('')
    const [ numeOras, setNumeOras ] = useState('')
    const {data: orase, error} = useSWR(`https://geocoding-api.open-meteo.com/v1/search?name=${continutInput}&count=5&language=en&format=json`, fetcher)

    const contentHandler = () => {
        setNumeOras(continutInput)
        setContinutInput('')
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            contentHandler()
        }
      };

      
    //   if (error) return <div><p>error... {error}</p></div>

    return(
        <div>
            <Center  margin={'20px 0'}>
                <Flex width={'1000px'} position={'relative'} align={"center"} padding={'0 10px'}>
                    <Input onChange={(e) => setContinutInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        padding={'10px 15px'} borderRadius={'40px 0 0 40px'}
                        border={'1px solid grey'} borderRight={'none'}
                        placeholder='Search' />

                    <Box onClick={contentHandler} 
                         as='button' height={'40px'} borderRadius={'0 40px 40px 0'}
                         border={'1px solid grey'} color={'grey'} padding={'5px 10px'}
                         fontSize={'1.5rem'}> <CiSearch />
                    </Box>
                         <Box >
                            {continutInput  !== '' && (
                                
                                orase  === undefined ? <p>...</p> : (
                                    <Flex position={'absolute'} top={'45px'} left={'0'} flexWrap={'wrap'}
                                        padding={'10px 0px'} flexDirection={'column'} width={'100%'}
                                        boxShadow={'1px 2px 3px 2px rgb(209, 200, 200)'} borderRadius={'10px'} zIndex={'10'}
                                        backgroundColor={'white'}>
                                    {orase.results === undefined ? (
                                        <p>...</p>
                                    ) : (
                                        orase.results.map((post, index) => (
                                            <Link href={`/${post.name}/${post.id}`}  key={post.id} margin={'10px'}>
                                                <Flex  padding={'5px'} 
                                                _hover={{ backgroundColor: "rgb(224, 223, 223)" }}>
                                                    <h2>{post.name}</h2>
                                                    <h2>, {post.population ? post.population + ' catateni' : '...' }</h2>
                                                </Flex>
                                            </Link>
                                        ))
                                    )}
                                </Flex>
                                )
                            )}
                            
                           
                         </Box>
                </Flex>
            </Center>
           

            {numeOras === '' ? (<Flex flexDir={'column'}>
                <HeroSection2/>
            </Flex>)
            : (<ListaOrase numeOras={numeOras} />)}
        </div>
    )
}