import './App.css';
import { Login, Home, Categories, Color } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/color",
    element: <Color />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
