import { render, cleanup } from '@testing-library/react';
import PaymentPage from '../PaymentPage';

describe('<PaymentPage />', () => {
  afterEach(cleanup)

  test('renders correctly', () => {
    const { container } = render(<PaymentPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
