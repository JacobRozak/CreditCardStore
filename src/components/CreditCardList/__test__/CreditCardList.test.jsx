import { render, cleanup } from '@testing-library/react';
import CreditCardList from './CreditCardList';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('<CreditCardList />', () => {
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
  afterEach(cleanup)

  test('renders correctly', () => {
    const { getByText } = render(<Provider store={store}><CreditCardList /></Provider>);
    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  test('renders the right text when there are no credit cards', () => {
    let emptyState = {
      creditCard: {
        creditCardItems: []
      }
    }
    let emptyStore = mockStore(emptyState);
    const { getByText } = render(<Provider store={emptyStore}><CreditCardList /></Provider>);
    expect(getByText("No cards here just yet! Make sure to upload cards first")).toBeInTheDocument();
  });
});
