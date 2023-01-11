import { render, fireEvent } from '@testing-library/react';
import CardNav from '../CardNav';
import { MemoryRouter } from "react-router-dom";
// import { AppContext } from "../../../context/context";

describe('<CardNav />', () => {
  test('renders correctly', () => {
    const { getByText } = render(<MemoryRouter><CardNav /></MemoryRouter>);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/add Card/i)).toBeInTheDocument();
    expect(getByText(/Transactions history/i)).toBeInTheDocument();
  });

  test('change theme', () => {
    const { container } = render(<MemoryRouter><CardNav /></MemoryRouter>);
    const changeTheme = container.getElementsByClassName('changetheme')[0];
    fireEvent.click(changeTheme);
    expect(changeTheme).toHaveBeenCalled();
  });

  test('Home link redirect to the right url', async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <CardNav />
      </MemoryRouter>
    );
    const link = getByText(/Home/i);
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });
  
  test('add Card link redirect to the right url', async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <CardNav />
      </MemoryRouter>
    );
    const link = getByText(/add Card/i);
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/payment');
  });

  test('Transactions history link redirect to the right url', async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <CardNav />
      </MemoryRouter>
    );
    const link = getByText(/Transactions history/i);
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/transfers');
  });

});
