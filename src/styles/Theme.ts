import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
  color: 'black',
};

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f25757',
      100: '#3b3355',
      200: '#c6ca53',
      300: '#17a398',
      400: '#e9e6ff',
      500: '#f25757',
      600: '#3b3355',
      700: '#c6ca53',
      800: '#17a398',
      900: '#e9e6ff',
    },
    green: {
      50: '#EEF6F2',
      100: '#CFE7DB',
      200: '#B1D8C4',
      300: '#92C9AC',
      400: '#74B995',
      500: '#55AA7E',
      600: '#448865',
      700: '#33664C',
      800: '#224432',
      900: '#112219',
    },
    purple: {
      50: '#F1EEF6',
      100: '#D8D1E6',
      200: '#BEB3D6',
      300: '#A595C5',
      400: '#8B78B5',
      500: '#725AA5',
      600: '#5B4884',
      700: '#443663',
      800: '#2E2442',
      900: '#171221',
    },
    pink: {
      50: '#FDE8F2',
      100: '#F9BEDC',
      200: '#F494C5',
      300: '#F06BAF',
      400: '#EC4198',
      500: '#E81782',
      600: '#BA1268',
      700: '#8B0E4E',
      800: '#5D0934',
      900: '#2E051A',
    },
    cyan: {
      50: '#E7F9FD',
      100: '#BCEEFA',
      200: '#91E3F7',
      300: '#66D8F4',
      400: '#3CCDF1',
      500: '#11C2EE',
      600: '#0D9BBF',
      700: '#0A758F',
      800: '#074E5F',
      900: '#032730',
    },
    teal: {
      50: '#EDF8F8',
      100: '#CCEBEA',
      200: '#ABDEDD',
      300: '#8AD0D0',
      400: '#69C3C2',
      500: '#49B6B5',
      600: '#3A9291',
      700: '#2C6D6D',
      800: '#1D4948',
      900: '#0F2424',
    },
    yellow: {
      50: '#FCF8E8',
      100: '#F8EABF',
      200: '#F3DD95',
      300: '#EFD06C',
      400: '#EAC342',
      500: '#E6B519',
      600: '#B89114',
      700: '#8A6D0F',
      800: '#5C490A',
      900: '#2E2405',
    },
    blue: {
      50: '#E8F2FC',
      100: '#BFDBF7',
      200: '#97C3F2',
      300: '#6EACED',
      400: '#4595E8',
      500: '#1C7EE3',
      600: '#1664B6',
      700: '#114B88',
      800: '#0B325B',
      900: '#06192D',
    },
    orange: {
      50: '#FBF0E9',
      100: '#F5D6C2',
      200: '#EEBC9B',
      300: '#E7A174',
      400: '#E0874D',
      500: '#DA6D25',
      600: '#AE571E',
      700: '#834116',
      800: '#572C0F',
      900: '#2C1607',
    },
    red: {
      50: '#FCE9E9',
      100: '#F5C1C1',
      200: '#EF9A9A',
      300: '#E97272',
      400: '#E34A4A',
      500: '#DD2222',
      600: '#B01C1C',
      700: '#841515',
      800: '#580E0E',
      900: '#2C0707',
    },
  },

  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            'textarea:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            // 'select:not([value=""]) + label, .chakra-select__wrapper + label': {
            //   ...activeLabelStyles,
            // },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              color: 'gray.500',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});

export default theme;
