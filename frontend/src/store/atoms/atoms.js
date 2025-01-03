import {atom} from 'recoil'
export const usernameAtom = atom({
    key:"username",
    default: ""
});
export const passwordAtom = atom({
    key: "password",
    default: ""
});
export const firstnameAtom = atom({
    key: "firstname",
    default: ""
});
export const lastnameAtom = atom({
    key: "lastname",
    default: ""
});
