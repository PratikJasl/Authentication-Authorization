import { atom } from 'recoil';

export const emailState = atom({
    key: 'emailState',
    default: '',
});

export const userInfoState = atom({
    key: 'userInfoState',
    default: {
        email: '',
        role: ''
    }
});

export const logInStatus = atom({
    key: 'logInStatus',
    default: false
});