
import React, { useState } from 'react';
import { ProductI } from 'modules/types'; 
import styles from './ImageSlider.module.scss'; 
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';

interface ImageSliderProps {
  product: ProductI;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === product.images.length - 1;

  const handleNextImage = () => {
    if (!isLastImage) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (!isFirstImage) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className={styles.slider__container}>
      <button
        onClick={handlePrevImage}
        className={`${styles.slider__button} ${styles['slider__button-left']} ${isFirstImage ? styles['slider__button-disabled'] : ''}`}
        disabled={isFirstImage}
      >
        <PaginationIcon direction="left" strokeWidth='3' color="base" />
      </button>

      <img
        src={product.images[currentImageIndex]}
        alt={product.title}
        className={styles.slider__image}

      />

      <button
        onClick={handleNextImage}
        className={`${styles.slider__button} ${styles['slider__button-right']} ${isLastImage ? styles['slider__button-disabled'] : ''}`}
        disabled={isLastImage}
      >
        <PaginationIcon direction="right" strokeWidth='3' color="base" />
      </button>
    </div>
  );
};

export default ImageSlider;
