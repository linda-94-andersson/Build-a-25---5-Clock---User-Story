import { atom } from "recoil";

export const clockState = atom({
    key: "clockState",
    default: '25:00',
});