import './App.css';
import { Drawer } from './components';
import { Login, Categories, Color, Products } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Drawer />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "colors",
        element: <Color />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
