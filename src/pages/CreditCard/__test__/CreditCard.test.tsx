import { render, fireEvent } from '@testing-library/react';
import CreditCard from '../CreditCard';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('<CreditCard />', () => {
  let mockStore = configureStore();
  let initialState = {
    creditCard: {
      creditCardItems: [
        { id: 1, issuer: 'VISA', number: '1234 5678 1234 5678', name: 'John Doe', expiry: '01/25', cvc: '123', pin: '1234' },
        { id: 2, issuer: 'MasterCard', number: '5678 1234 5678 1234', name: 'Jane Doe', expiry: '02/25', cvc: '321', pin: '4321' }
      ]
    }
  }
  let store = mockStore(initialState);
  test('renders correctly', () => {
    const { getByText } = render(<Provider store={store}><CreditCard /></Provider>);
    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  test('shows empty state when there is no credit cards', () => {
    let emptyState = {
      creditCard: {
        creditCardItems: []
      }
    }
    let emptyStore = mockStore(emptyState);
    const { getByText } = render(<Provider store={emptyStore}><CreditCard /></Provider>);

    expect(getByText(/Here is no credit cards/i)).toBeInTheDocument();
    expect(getByText(/order/i)).toBeInTheDocument();
  });
});
