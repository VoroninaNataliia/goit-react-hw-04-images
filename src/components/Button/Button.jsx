import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={s.div}>
      <button type="button" className={s.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};