/* import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; */
import MainApp from './App';
/* import App from './App';
import store from './redux/redux-store'; */
import ReactDOM from 'react-dom'


test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div)
});


/* 
test('renders learn react link', () => {
  render(
    <MainApp />
    );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */