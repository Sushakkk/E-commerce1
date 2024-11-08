import React from 'react';
import Text from 'components/Text/Text';
import Button from 'components/Button';
import styles from './ProductDetails.module.scss';
import { ProductI } from 'modules/types';

interface ProductDetailsProps {
    product: ProductI;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { title, description, price } = product;

    return (
        <div className={styles['product__text-container']}>
            <div className={styles.product__text_title}>
                <Text view="title" weight="bold">
                    {title}
                </Text>
                <Text view="p-20" color="secondary">
                    {description}
                </Text>
            </div>
            <div className={styles.product__price}>
                <Text view="title" className="page-title-price" weight="bold">
                    ${price}
                </Text>
                <div className={styles.product__buttons}>
                    <Button width="135px" className={styles["buy-now-button"]}>Buy Now</Button>
                    <Button className={styles["add-to-cart-button"]}>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
