import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

const instance = axios.create({
    
    withCredentials: false
})

export default class Api {
    static async getUsers(): Promise<AxiosResponse<IUser[]>>{
        return instance.get<IUser[]>('https://gist.githubusercontent.com/ivannwebdev/adbc10764b5bb3b18b0493d2bd84962a/raw/1b5494b79894f5984a1a25156e3fa0ba127afb7f/users.json')
    }
}