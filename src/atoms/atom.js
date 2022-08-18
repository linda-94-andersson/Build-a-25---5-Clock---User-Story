import { atom } from "recoil";

export const sessionCounterState = atom({
    key: "sessionCounterState",
    default: '25',
});

export const breakState = atom({
    key: "breakState",
    default: "5",
});

export const timerCounterState = atom({
    key: "timerCounterState",
    default: "SESSION",
});


export const pauseState = atom({
    key: "pauseState",
    default: true,
});