// store/StoreContext.js
import React, { createContext, useContext } from 'react';
import UserStore from './UserStore';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const store = {
        user: new UserStore(),
    };

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};
