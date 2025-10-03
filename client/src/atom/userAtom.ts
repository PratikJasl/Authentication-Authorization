import { atom } from 'recoil';

export interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  role: string | null;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  email: null,
  role: null,
};

export const logInStatus = atom<AuthState>({
    key: 'logInStatus',
    default: initialAuthState
});

export const emailState = atom<string | null>({
    key: 'emailState',
    default: null
});