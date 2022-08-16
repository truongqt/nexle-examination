import { action, flow, flowResult, makeAutoObservable, observable, observe } from "mobx";
import { observer } from "mobx-react";
import { ENDPOINTS } from "utils/helpers/constants";
import { api } from "utils/services/apis";

export interface User {
    _id: string;
    email: string;
    admin: boolean;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    displayName: string;
    token: string;
    refreshToken: string;
}

export interface SignInRequestPayload {
    email: string;
    password: string;
};

export class UserStore {
// @observable user: User = {} as User;

// @action signIn = async (requestPayload: SignInRequestPayload) => {
//     const res = await api.post(ENDPOINTS.SIGN_IN, requestPayload);
//     console.log('signIn res: ', JSON.stringify(res))
//     // this.user = res.data as User;
// }

user: User = {} as User;
state = 'pending';
constructor(){
    makeAutoObservable(this, {
        user: flow
    })
}

*signIn (requestPayload: SignInRequestPayload) {
    this.user = {} as User;
    this.state = 'pending';
    try {
        const res: any = yield api.post(ENDPOINTS.SIGN_IN, requestPayload);
        console.log('res: ', JSON.stringifyres)
    } catch (error) {
        console.log('error: ', JSON.stringify(error))
    }
}
}

const userStore = new UserStore();
