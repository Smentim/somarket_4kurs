import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemItem from './ItemItem';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock data for device and serverId
const mockDevice = {
  item: {
    id: '1',
    name: 'Test Item',
    img: '/test-img.jpg',
  },
  price: '100',
  quantity: '10',
  user: {
    'serverId123': 'testUser',
  },
};

const mockServerId = {
  serverId: 'serverId-123',
};

// Helper function to render the component with necessary context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: Router });
};

test('renders ItemItem component with device details', () => {
  renderWithRouter(<ItemItem device={mockDevice} serverId={mockServerId} />);

  expect(screen.getByText('Название: Test Item')).toBeInTheDocument();
  expect(screen.getByText('Цена за единицу: 100')).toBeInTheDocument();
  expect(screen.getByText('Количество: 10')).toBeInTheDocument();
  expect(screen.getByText('testUser')).toBeInTheDocument();
});

test('shows buy message textarea when "Купить" button is clicked', () => {
  renderWithRouter(<ItemItem device={mockDevice} serverId={mockServerId} />);

  fireEvent.click(screen.getByText('Купить'));

  expect(screen.getByText('Скопируйте сообщение ниже:')).toBeInTheDocument();
  expect(screen.getByDisplayValue('@testUser Привет. Хочу купить: "Test Item" за 100 рублей (somarket)')).toBeInTheDocument();
  expect(screen.getByText('Закрыть')).toBeInTheDocument();
});

test('hides buy message textarea when "Закрыть" button is clicked', () => {
  renderWithRouter(<ItemItem device={mockDevice} serverId={mockServerId} />);

  fireEvent.click(screen.getByText('Купить'));
  fireEvent.click(screen.getByText('Закрыть'));

  expect(screen.queryByText('Скопируйте сообщение ниже:')).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue('@testUser Привет. Хочу купить: "Test Item" за 100 рублей (somarket)')).not.toBeInTheDocument();
});
