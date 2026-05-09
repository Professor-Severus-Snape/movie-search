import type { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import type { IFilmShort } from '../../models/models';
import { addToFavourites, removeFromFavourites } from '../../redux/favouritesSlice';
import starAdded from '../../assets/starAdded.svg';
import starNotAdded from '../../assets/starNotAdded.svg';
import './star.css';

const Star = ({ imdbID }: { imdbID: string }) => {
  const { films } = useSelector((state: RootState) => state.films); // найденные фильмы
  const { favourites } = useSelector((state: RootState) => state.favourites); // избранные фильмы

  const dispatch: AppDispatch = useDispatch();

  const isFavourite = favourites.some((film: IFilmShort) => film.imdbID === imdbID); // в избранном?
  const star = isFavourite ? starAdded : starNotAdded; // смена вида звезды (при каждом рендере!)

  const handleStarClick = () => {
    if (!isFavourite) {
      const filmToAdd = films.find((film) => film.imdbID === imdbID);

      if (filmToAdd) {
        dispatch(addToFavourites(filmToAdd)); // добавляем фильм в избранное (в store)
      }
    } else {
      dispatch(removeFromFavourites(imdbID)); // удаляем фильм из избранного по id (из store)
    }
  };

  return (
    <img
      className="star"
      src={star}
      alt="избранное"
      title="добавить в избранное"
      onClick={handleStarClick}
    />
  );
};

export default Star;
