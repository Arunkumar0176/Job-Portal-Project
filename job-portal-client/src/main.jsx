import ReactDOM from 'react-dom/client'; // Make sure this line is uncommented
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider from react-router-dom

import './index.css';
import router from './Router/Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
