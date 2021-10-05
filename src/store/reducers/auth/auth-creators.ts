import Api from "../../../api/api";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";

export const authCreators = {
    setAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: auth
    }),
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER,
        payload: user
    }),
    setError: (error: string) : SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR,
        payload: error
    }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload: isLoading
    }),
    login: (username: string, password: string) => async(dispatch: AppDispatch) => {
        try{
            dispatch(authCreators.setIsLoading(true))
            setTimeout(async() => {
                const response = await Api.getUsers()
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                console.log(mockUser)
                if(mockUser){
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', `${username}`)
                    dispatch(authCreators.setUser(mockUser))
                    dispatch(authCreators.setAuth(true))
                    
                } else {
                    dispatch(authCreators.setError('Некорректный логин или пароль'))
                }
                dispatch(authCreators.setIsLoading(false))
            }, 1000)
    
        }
        catch(e){
            dispatch(authCreators.setError('Ошибка'))
        }
    },

    logout: () => async(dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        dispatch(authCreators.setUser({} as IUser))
        dispatch(authCreators.setAuth(false))
    }
}