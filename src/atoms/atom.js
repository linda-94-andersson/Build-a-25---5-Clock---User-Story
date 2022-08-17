import { atom } from "recoil";

export const sessionCounterState = atom({
    key: "sessionCounterState",
    default: '1500',
});

export const breakState = atom({
    key: "breakState",
    default: "300",
});

export const playState = atom({
    key: "playState",
    default: false,
});

export const sessionState = atom({
    key: "sessionState",
    default: true,
});