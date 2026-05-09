import { RouterProvider } from 'react-router-dom';
import router from './router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

// API:
// Запрос всех фильмов по названию: http://www.omdbapi.com/?apikey=64405bd2&s=die+hard
// Запрос 1 конкретного фильма по названию: http://www.omdbapi.com/?apikey=64405bd2&t=die+hard
// Запрос 1 конкретного фильма по IMDb ID: http://www.omdbapi.com/?apikey=64405bd2&i=tt0095016
