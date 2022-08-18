import { atom } from "recoil";

export const breakState = atom({
    key: "breakState",
    default: 5,
});

export const sessionState = atom({
    key: "sessionState",
    default: 25,
});

export const playState = atom({
    key: "playState",
    default: true,
});