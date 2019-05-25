import {SIGN_IN, SIGN_OUT} from './types';

export function SignIn(userId){
    return { 
        type: SIGN_IN,
        payload: userId
    }
}

export function SignOut(){
    return { type: SIGN_OUT }
}