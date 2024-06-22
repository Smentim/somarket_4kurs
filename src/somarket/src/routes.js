import { Component } from "react";
import Admin from "./pages/Admin";
import { ADMIN_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/ItemPage";
import Main from "./pages/Maim";
import Profile from "./pages/ProfilPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
]