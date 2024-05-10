import { atom } from 'recoil';

const isMobile = atom({
  key: 'isMobile',
  default: false,
});

export { isMobile };