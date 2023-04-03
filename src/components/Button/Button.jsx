import s from './Button.module.css';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <>
      <div className={s.container}>
        <button onClick={onClick} className={s.button} type="button">
          Load more
        </button>
      </div>
    </>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
