import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import SingleCard from '../SingleCard';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('<SingleCard />', () => {
  let mockStore = configureStore();
  let initialState = {
    creditCard: {
      creditCardItems: [
        { id: 1, issuer: 'VISA', number: '1234 5678 1234 5678', name: 'John Doe', expiry: '01/25', cvc: '123', balance: 100, pin: 1234 },
        { id: 2, issuer: 'MasterCard', number: '5678 1234 5678 1234', name: 'Jane Doe', expiry: '02/25', cvc: '321', balance: 200, pin: 4321 }
      ]
    }
  }
  let store = mockStore(initialState);
  afterEach(cleanup)

  test('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <SingleCard />
        </Router>
      </Provider>
    );
    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/Jane Doe/i)).toBeInTheDocument();
  });
});
