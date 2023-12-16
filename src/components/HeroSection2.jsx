import * as React from 'react';
import { Container, chakra, Stack, Text, Button, Box } from '@chakra-ui/react';
import Image from 'next/image';
// Here we have used react-icons package for the icons
import { FaGithub } from 'react-icons/fa';

const HeroSection2 = () => {
  return (
    <Container p={{ base: 8, sm: 14 }}>
      <Stack direction="column" spacing={6} alignItems="center">
        <Box py={2} px={3} bg="teal" w="max-content" color="white" rounded="md" fontSize="sm">
          <Stack direction={{ base: 'column', sm: 'row' }}>
            <Text fontWeight="bold">Ready, Set, Explore! 🚀</Text>
            <Text>Ce mai aștepți?</Text>
          </Stack>
        </Box>
        
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
        Completează caseta de căutare cu numele orașelor pe care dorești să le vizitezi și vei găsi informații despre acestea.
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', sm: 'auto' }}
          spacing={5}
        >
          <Image
        src="/img/explore.jpg" 
        alt="Explore Image"
        width={500} 
        height={300} 
      />
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeroSection2;
