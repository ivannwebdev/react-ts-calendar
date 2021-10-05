import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { PublicRoutes, PrivateRoutes, RoutNames } from '../router';
import { useTypeSelector } from './../hooks/useTypeSelector';


const AppRouter = () => {
    const {isAuth} = useTypeSelector(state => state.auth)
    return(
        isAuth ? 
        <Switch>
            {PrivateRoutes.map((route => <Route key= {route.path} {...route}/>
            ))}

            <Redirect to= {RoutNames.EVENT}/>
        </Switch>
        :
        <Switch>
            {PublicRoutes.map(route => <Route key= {route.path} {...route}/>
            )}

            <Redirect to= {RoutNames.LOGIN}/>
        </Switch>
    )
}

export default AppRouter

