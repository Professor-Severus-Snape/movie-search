import { Link } from 'react-router-dom';
import type { IFilmShort } from '../../models/models';
import Star from '../Star/Star';
import noImage from '../../assets/noImage.png';
import './film.css';

const Film = ({ film }: { film: IFilmShort }) => {
  let { Poster, Type, Year } = film; // данные текущего фильма

  const checkData = () => {
    if (!Poster || Poster === 'N/A') Poster = noImage;
    if (!Type || Type === 'N/A') Type = 'нет данных';
    if (!Year || Year === 'N/A') Year = 'нет данных';
  };

  checkData();

  return (
    <li className="film">
      <img className="film__poster" src={Poster} />
      <div className="film__info">
        <h2 className="film__title">
          {/* Навигация из корня проекта: */}
          <Link className="film__link" to={`/${film.imdbID}`}>
            {film.Title}
          </Link>
        </h2>
        <span className="film__type">Жанр: {Type}</span>
        <span className="film__year">Год выпуска: {Year}</span>
      </div>

      <Star imdbID={film.imdbID} />
    </li>
  );
};

export default Film;
