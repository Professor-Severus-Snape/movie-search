import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { fetchFilms, removeFilms } from '../../redux/filmsSlice';
import { clearForm, saveInputValue } from '../../redux/formSlice';
import resetBtn from '../../assets/reset.svg';
import './form.css';

const Form = () => {
  const { inputValue } = useSelector((state: RootState) => state.form)
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(saveInputValue(value)); // сохранение значения из инпут-а (в store)
    dispatch(removeFilms()); // очистка массива с фильмами (в store)
  };

  const handleReset = () => {
    dispatch(clearForm()); // сброс формы (в store)
    dispatch(removeFilms()); // очистка массива с фильмами (в store)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      dispatch(clearForm()); // сброс формы (в store)
      return; // чтобы не отсылать запрос с пустым полем
    }

    const queryParamValue = trimmedValue.replace(/ /g, '+').toLowerCase();

    dispatch(fetchFilms(queryParamValue)); // поиск фильмов по значению из инпут-а
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <label htmlFor="search" className="visually-hidden">Введите название фильма</label>
        <input
          id="search"
          className="form__input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Введите название фильма на английском языке..."
          required
        />
        <img
          className="form__reset-btn"
          src={resetBtn}
          alt="очистить"
          onClick={handleReset}
        />
      </fieldset>
      <button className="form__button" type="submit">Поиск</button>
    </form>
  );
};

export default Form;
