import { createSlice } from '@reduxjs/toolkit';
import type { IFilmShort } from '../models/models';

interface IInitialState {
  favourites: IFilmShort[];
}

const initialState: IInitialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // в payload -> объект (фильм целиком) -> для добавления в массив избранных фильмов
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    // в payload -> строка со значением поля imdbID -> для удаления из массива избранных фильмов
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (film) => film.imdbID !== action.payload
      );
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
