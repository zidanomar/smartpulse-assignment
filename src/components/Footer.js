import { Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

import SmartPulse from '../smartpulse-logo-12.svg';

function Footer() {
  return (
    <Flex flexDirection='column' gap='6' py='16' textAlign='center'>
      <Image src={SmartPulse} alt='logo' h='10' />
      <Text as='h3' mb={6}>
        made with ❤️ by{' '}
        <Link href='https://430am.dev' isExternal my='16' color='green.500'>
          Zidan Omar Hamid
        </Link>
      </Text>
    </Flex>
  );
}

export default Footer;
