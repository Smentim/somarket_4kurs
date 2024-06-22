// src/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context } from './index'; // Импортируйте ваш контекст
import ItemStore from './store/ItemStore';

const renderWithContext = (ui, { providerProps, ...renderOptions } = {}) => {
  const device = new ItemStore();
  const Wrapper = ({ children }) => (
    <Context.Provider value={{ device, ...providerProps }}>
      <Router>{children}</Router>
    </Context.Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithContext };
