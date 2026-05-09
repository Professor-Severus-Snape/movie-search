import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IFilmFull } from '../../models/models';
import Star from '../../components/Star/Star';
import noImage from '../../assets/noImage.png';
import './filmFullDescription.css';

const FilmFullDescription = () => {
  // data: { Poster, Title, Year, Genre, Runtime, Director, Actors, imdbRating }
  const [data, setData] = useState<IFilmFull | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams(); // достаем значение imdbID по названию динамического параметра
  
  const checkJsonValues = (json: IFilmFull) => {
    const checkedJson: IFilmFull = {...json};

    Object.entries(checkedJson).forEach(([key, value]) => {
      if (!value || value === "N/A") {
        checkedJson[key as keyof IFilmFull] = key === 'Poster' ? noImage : 'нет данных';
      }
    });

    return checkedJson;
  }

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const apikey = `apikey=${import.meta.env.VITE_API_KEY}`;
      const queryParam = `i=${id}`;
    
      try {
        setLoading(true);
        const response = await fetch(baseUrl + '?' + apikey + '&' + queryParam); // получаем данные

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();
        const checkedJson = checkJsonValues(json); // подмена значений "N/A" на "нет данных"
        setData(checkedJson); // сохранение полученных данных в локальный стейт
        setError(null); // нет ошибки
      } catch (err) {
        if (err instanceof Error) {
          setError(err); // возникла ошибка
        }
      } finally {
        setLoading(false); // загрузка данных завершена
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>Ошибка получения данных...</h4>}

      {data && (
        <article className="film-description">
          <img className="film-description__poster" src={data.Poster} />
          <div className="film-description__info">
            <h2 className="film-description__title">{data.Title}</h2>
            <span className="film-description__year">Год выпуска: {data.Year}</span>
            <span className="film-description__genre">Жанр: {data.Genre}</span>
            <span className="film-description__runtime">Продолжительность: {data.Runtime}</span>
            <span className="film-description__director">Режиссер: {data.Director}</span>
            <span className="film-description__actors">В ролях: {data.Actors}</span>
            <span className="film-description__rating">Рейтинг: {data.imdbRating}</span>
          </div>

          {id && <Star imdbID={id} />}
        </article>
      )}
    </>
  );
};

export default FilmFullDescription;
