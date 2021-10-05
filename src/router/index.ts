import React from "react"
import Event from "./../pages/Event";
import Login from './../pages/Login';

export interface Route {
    path: string,
    component: React.ComponentType,
    exact: boolean
}

export enum RoutNames {
    LOGIN= '/login',
    EVENT= '/'
}

export const PublicRoutes: Route[] = [
    {path: RoutNames.LOGIN, exact: true, component: Login}
]

export const PrivateRoutes: Route[] = [
    {path: RoutNames.EVENT, exact: true, component: Event}
]