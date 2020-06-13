import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

describe('Hello component', () => {
  it('render hello', () => {
    render(<Hello />);
    expect(screen.getByText('hello')).toBeTruthy();
  });
});
