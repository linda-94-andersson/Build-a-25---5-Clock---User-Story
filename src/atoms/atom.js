import { atom } from "recoil";

export const breakState = atom({
    key: "breakState",
    default: 300,
});

export const sessionState = atom({
    key: "sessionState",
    default: 60 * 25,
});

export const intervalState
    = atom({
        key: "intervalState",
        default: null,
    });

export const typeState
    = atom({
        key: "typeState",
        default: "Session",
    });

export const playState = atom({
    key: "playState",
    default: true,
});