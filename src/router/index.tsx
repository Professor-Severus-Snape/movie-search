import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Favourites from '../pages/Favourites/Favourites';
import FilmFullDescription from '../pages/FilmFullDescription/FilmFullDescription';

import Layout from '../components/Layout/Layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'favourites', element: <Favourites /> },
      { path: ':id', element: <FilmFullDescription /> },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL }); // 'base' vite

export default router;
