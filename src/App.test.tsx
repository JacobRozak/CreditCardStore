import { render, cleanup } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  afterEach(cleanup);

  test('renders correctly', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});