import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL }) => {
    return (
      <li className={s.imageGalleryItem} key={id}>
        <img
          onClick={onClick}
          src={webformatURL}
          id={id}
          alt=""
          className={s.imageGalleryItemImage}
        />
      </li>
    );
  });
};
