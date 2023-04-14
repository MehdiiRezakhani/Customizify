import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#172142',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './HLogo.png',
  fullDecal: './HLogo.png',
});

export default state;