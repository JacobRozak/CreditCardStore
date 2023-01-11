import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';

function TestComponent() {
  const [month, SetMonth] = useState('');
  const [expiry, SetExpiry] = useState('');
  const [issuer, SetIssuer] = useState('');

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetMonth(e.target.value);
    SetExpiry(e.target.value);
  };

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetExpiry(month.concat(e.target.value));
  };

  const handleIssuer = (e: React.ChangeEvent<any>) => {
    SetIssuer(e.target.value)
  };

  return (
    <div>
      <input data-testid="date-input" onChange={handleDate} />
      <input data-testid="expiry-input" onChange={handleExpiry} />
      <input data-testid="issuer-input" onChange={handleIssuer} />
    </div>
  );
}

// test('handleDate sets the month and expiry state', () => {
//   const { getByTestId } = render(<TestComponent />);
//   const dateInput = getByTestId('date-input');
//   fireEvent.change(dateInput, { target: { value: '05/2022' } });
//   expect(dateInput.value).toBe('05/2022');
//   expect(month.state).toBe('05/2022');
//   expect(expiry.state).toBe('05/2022');
// });

// test('handleExpiry sets the expiry state by concatenating the month state', () => {
//   const { getByTestId } = render(<TestComponent />);
//   const expiryInput = getByTestId('expiry-input');
//   fireEvent.change(expiryInput, { target: { value: '05' } });
//   expect(expiryInput.value).toBe('05');
//   expect(expiry.state).toBe('05/2022');
// });

// test('handleIssuer sets the issuer state', () => {
//   const { getByTestId } = render(<TestComponent />);
//   const issuerInput = getByTestId('issuer-input');
//   fireEvent.change(issuerInput, { target: { value: 'Visa' } });
//   expect(issuerInput.value).toBe('Visa');
//   expect(issuer.state).toBe('Visa');
// });