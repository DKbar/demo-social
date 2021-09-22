import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "be208add-76be-474f-b426-6fa8679c0152" }
});


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
} 

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
} 


export type APIResponseType <D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}