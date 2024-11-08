// ProductList.tsx
import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import styles from './ProductList.module.scss';
import { ProductI } from 'modules/types';
import { useNavigate } from 'react-router-dom';
import { handleCardClick } from 'utils/navigationUtils';

interface ProductListProps {
  products: ProductI[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate(); 

  return (
    <section className={styles['products__cards']}>
      {products.map((product) => (
        <div className={styles['products__column']} key={product.id}>
          <Card
            image={product.images[0]}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.category.name}
            contentSlot={`$${product.price}`}
            actionSlot={<Button>Add to Cart</Button>}
            className={styles['products__card']}
            onClick={() => handleCardClick(product, products, navigate)} 
          />
        </div>
      ))}
    </section>
  );
};

export default ProductList;
