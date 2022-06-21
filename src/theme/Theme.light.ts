import { black, white } from '@theme/Theme';
import { Colors } from '@theme/Theme.styled';

const lightTheme = (): Colors => {
  return {
    // base
    white,
    black,

    // border
    border1: '#363636',
    border2: '#DDDDDD',
    border3: '#F2F2F2',
    border4: '#F2F4F5',

    // Background
    bg1: '#F2F2F2',
    bg2: '#1A1A1A',
    bg3: '#303030',
    bg4: '#404040',
    bg5: '#F2F4F5',

    // content
    content1: '#000000',
    content2: '#9C9C9C',
    content3: '#0ECB81',
    content4: '#F6465D',

    // Primary
    primary1: '#1C55B8',
    primary2: '#1A73E8',
    primary3: '#6BA0FB',
    primary4: '#ECF3FF',
    primary5: '#FFFFFF',
    primary6: '#000000',
    primary7: '#757575',
    primary8: '#9C9C9C',
    primary9: '#C0C0C0',
    primary10: '#DDDDDD',
    primary11: '#F5F5F5',
    primary12: '#F9F9F9',
    primary13: '#FCFCFC',

    // Buttons
    btn1: '#1A73E8',
    btn2: '#03A66D',
    btn3: '#CF304A',
  };
};

export default lightTheme;
