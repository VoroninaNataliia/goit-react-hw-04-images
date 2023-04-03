import s from './ImageGallery.module.css';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const Gallery = ({ images, onClick, Loader }) => {
  return (
    <>
      <ul className={s.imageGallery}>
        {<Item Loader={Loader} onClick={onClick} images={images} />}
      </ul>
    </>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  Loader: PropTypes.bool.isRequired,
};
