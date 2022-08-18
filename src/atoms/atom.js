import { atom } from "recoil";

export const displayState = atom({
    key: "displayState",
    default: 60*25,
});

export const breakState = atom({
    key: "breakState",
    default: 60*5,
});

export const sessionState = atom({
    key: "sessionState",
    default: 60*25,
});


export const timerOnState = atom({
    key: "timerOnState",
    default: false,
});

export const onBreakState = atom({
    key: "onBreakSate",
    default: false
});