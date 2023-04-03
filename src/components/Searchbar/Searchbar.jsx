import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit, onChange }) => {
  return (
    <>
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={onSubmit}>
          <button className={s.button} type="submit"></button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
          />
        </form>
      </header>
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
