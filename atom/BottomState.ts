import { atom, selector } from 'recoil';

const BottomState = atom({
  key: 'BottomState',
  default: false,
});

const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => (get(BottomState)),
  set: ({set}, newValue) => set(BottomState,newValue),
});

export { BottomState };