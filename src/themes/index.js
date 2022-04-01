import { extendTheme, theme as base } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    '*, *::before, &::after': {
      margin: 0,
      padding: 0,
      boxSizing: 'inherit',
    },
    body: {
      boxSizing: 'border-box',
    },
    a: {
      _hover: {
        textDecoration: 'none !important',
        color: 'green.300',
      },
    },
  }),
};

export const theme = extendTheme({
  styles,
  config,
  fonts: {
    heading: `'Poppins', ${base.fonts.heading}`,
    body: `'Poppins', ${base.fonts.body}`,
  },
});
