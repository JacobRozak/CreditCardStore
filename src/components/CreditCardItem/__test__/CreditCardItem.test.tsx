import { render, fireEvent } from '@testing-library/react';
import CreditCardItem from '../CreditCardItem';
import { AppContext } from "../../../context/context";
import { MemoryRouter } from "react-router-dom";

const sampleProps = {
    id: 1,
    issuer: 'VISA',
    number: '1234 5678 1234 5678',
    name: 'John Doe',
    expiry: '01/25',
    cvc: '123',
    pin: '1234'
};

describe('<CreditCardItem />', () => {
  test('renders correctly', () => {
    const { getByText } = render(<CreditCardItem {...sampleProps} />);

    expect(getByText(/Get info/i)).toBeInTheDocument();
    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/VISA/i)).toBeInTheDocument();
  });
  
  test('navigates to correct route when button is clicked', async () => {
    const { getByText } = render(<MemoryRouter><CreditCardItem {...sampleProps} /></MemoryRouter>);
    const button = getByText(/Get info/i);
    fireEvent.click(button);

    expect(prompt).toHaveBeenCalled();
    expect(prompt).toHaveBeenCalledWith('pass the pin code');
    expect(prompt).toHaveBeenCalledTimes(1);

    window.prompt = jest.fn().mockReturnValueOnce('1234');
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/card/1');
  });

  test('show error message when wrong password is passed', async () => {
    const { getByText } = render(<MemoryRouter><CreditCardItem {...sampleProps} /></MemoryRouter>);
    const button = getByText(/Get info/i);
    fireEvent.click(button);

    expect(prompt).toHaveBeenCalled();
    expect(prompt).toHaveBeenCalledWith('pass the pin code');
    expect(prompt).toHaveBeenCalledTimes(1);

    window.prompt = jest.fn().mockReturnValueOnce('12345');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('WRONG PASSWORD');
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.location.pathname).not.toBe('/card/1');
  });

//   test('render with dark mode', () => {
//     const { container } = render(
//       <AppContext.Provider value={{ dark: true }}>
//         <CreditCardItem {...sampleProps} />
//       </AppContext.Provider>
      
//     )
//     expect(container.getElementsByClassName('dark')).toBeTruthy();
// })
})
