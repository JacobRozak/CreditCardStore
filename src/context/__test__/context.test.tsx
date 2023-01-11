import { render, act } from '@testing-library/react';
// import AppProvider from './AppProvider';

// describe('<AppProvider />', () => {
//   test('initial dark state', () => {
//     const { getByTestId } = render(<AppProvider><div data-testid="test-div"></div></AppProvider>);
//     expect(getByTestId("test-div").className).not.toEqual("dark");
//   });
//   test('change theme', () => {
//     const { getByTestId, getByText } = render(<AppProvider><div data-testid="test-div"></div></AppProvider>);
//     const changeTheme = getByText(/change theme/i);
//     fireEvent.click(changeTheme);
//     expect(getByTestId("test-div").className).toEqual("dark");
//   });
// });