import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import type { IFilmShort } from '../models/models';

// ответ от сервера: http://www.omdbapi.com/?apikey=64405bd2&s=die+hard
// {
//   Title: "Die Hard",
//   Year: "1988",
//   imdbID: "tt0095016",
//   Type: "movie",
//   Poster: "url картинки"
// }

interface IInitialState {
  films: IFilmShort[];
  loading: boolean;
  error: string;
}

const initialState: IInitialState = {
  films: [],
  loading: false,
  error: '',
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const filmsSlice = createSliceWithThunk({
  name: 'films',
  initialState,
  reducers: (creators) => ({
    removeFilms: creators.reducer((state) => {
      state.films = [];
    }),
    // asyncThunk<{Search: IFilmShort[]}, string> изначает, что асинхронный экшен будет принимать строку queryParamValue и возвращать action.payload вида { Search: IFilmShort[] } :
    fetchFilms: creators.asyncThunk<{ Search: IFilmShort[] }, string>(
      async (queryParamValue, { rejectWithValue }) => {
        try {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const apikey = `apikey=${import.meta.env.VITE_API_KEY}`;
          const queryParam = `s=${queryParamValue}`;

          const response = await fetch(
            baseUrl + '?' + apikey + '&' + queryParam
          );

          if (!response.ok) {
            return rejectWithValue('Ошибка при получении данных от сервера...');
          }
          
          return await response.json();
        } catch (err) {
          return rejectWithValue(err);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = '';
        },
        fulfilled: (state, action) => {
          state.films = action.payload.Search;
          state.error = '';
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});

export const { removeFilms, fetchFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
