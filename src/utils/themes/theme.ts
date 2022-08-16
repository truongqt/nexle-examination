import { createTheme } from '@shopify/restyle';
import { fonts } from 'assets';
import { scale } from 'utils/helpers/device';

const palette = {
    white: 'white',
    white_50_percent: 'rgba(255, 255, 255, 0.5)',
    c647FFF: '#647FFF',
    authen_gradient: {
        first: 'rgba(29, 34, 56, 0.13)',
        second: '#000000',
    },
    statusBar: 'white',
    c6C66FF: '#6C66FF',
    error: {
        short: 'rgba(255, 255, 255, 0.5)',
        week: '#E05151',
        fair: '#E3A063',
        good: '#647FFF',
        strong: '#91E2B7'
    },
    white_12_percent: 'rgba(255, 255, 255, 0.12)',
    white_82_percent: 'rgba(255, 255, 255, 0.82)',
    category_gradient: {
        first: 'rgba(29, 34, 56, 0.13)',
        second: '#000000',
    },
    category_item_gradient: {
        first: '#8A32A9',
        second: '#8A00FF',
    },
    red: 'red'
}



const theme = createTheme({
    colors: {
        mainBackground: palette.white,
        cardPrimaryBackground: palette.c647FFF,
        headerText: palette.white,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },

    textVariants: {
        header: {
            fontFamily: fonts.Lato.semiBold,
            fontWeight: '400',
            fontSize: scale(22),
            lineHeight: scale(26.4),
            color: 'headerText',
        },
        title: {
            fontFamily: fonts.Lato.regular,
            fontWeight: '400',
            fontSize: scale(12),
            lineHeight: scale(14.4),
            letterSpacing: scale(-0.3),
            color: 'headerText'
        },
        default: {
            fontFamily: fonts.Lato.semiBold,
            fontWeight: '400',
            fontSize: scale(22),
            lineHeight: scale(26.4),
            color: 'headerText',
        }
    },
    cardVariants: {
        main: {
            backgroudColor: palette.red,
            borderColor: palette.red,
            borderWidth: 3,
        }
    }
});

export type Theme = typeof theme;

const lightTheme: Theme = {
    ...theme,
    colors: {
        mainBackground: palette.red,
        cardPrimaryBackground: palette.red,
        headerText: palette.red,
    },

}
export { 
    theme,
    lightTheme
};