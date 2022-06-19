import { createTheme } from '@mui/material/styles';
import VazirWoff from '../fonts/vazir.woff';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const CustomTheme = createTheme({
    typography: {
        fontFamily: "Vazir"
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
          @font-face {
            font-family: 'Vazir';
            src: local('Vazir'), url(${VazirWoff});
          }
        `
        }
    },
    direction: 'rtl',
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export {
    CustomTheme,
    cacheRtl
}