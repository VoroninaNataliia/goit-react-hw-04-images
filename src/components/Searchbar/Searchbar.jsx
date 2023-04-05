import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export const SearchBar = ({ onSubmit }) => {
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.searchFormButton}></button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};