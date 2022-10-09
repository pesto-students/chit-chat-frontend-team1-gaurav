import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Login from "Pages/Login/Login";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// describe('login page',()=>{
//   test('login form should be in the document',()=>{
//     // const component=render( <Login/>);
//     // const phoneNumberInput= component.getByRole('textbox',{name:'phone-number'});
//     // expect(phoneNumberInput).toBeInTheDocument();
//     expect(true).toBeTruthy();
//   })
// })




