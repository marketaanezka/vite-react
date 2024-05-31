// App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders the greeting input and button', () => {
  render(<App />);
  expect(screen.getByText("Hi, who's there?")).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /say hi/i })).toBeInTheDocument();
});

test('updates greeting message on button click', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /say hi/i });

  fireEvent.change(input, { target: { value: 'John' } });
  fireEvent.click(button);

  expect(screen.getByText('Hi, John!')).toBeInTheDocument();
});
