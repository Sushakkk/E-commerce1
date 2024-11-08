import React from 'react';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { ProductI } from 'modules/types';
import { useNavigate } from 'react-router-dom';
import { handleCardClick } from 'utils/navigationUtils';
import styles from './RelatedProducts.module.scss';

interface RelatedItemsProps {
    relatedProducts: ProductI[];
    allProducts: ProductI[];
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ relatedProducts, allProducts }) => {
    const navigate = useNavigate();

    return (
        <div className={styles['related__cards']}>
            <Text view="p-32" weight="bold">
                Related Items
            </Text>
            <div className={styles.related__products}>
                {relatedProducts.map((relatedProduct) => (
                    <Card
                        key={relatedProduct.id}
                        image={relatedProduct.images[0]}
                        title={relatedProduct.title}
                        subtitle={relatedProduct.description}
                        captionSlot={relatedProduct.category.name}
                        contentSlot={`$${relatedProduct.price}`}
                        actionSlot={<Button>Add to Cart</Button>}
                        className={styles.related_product_card}
                        onClick={() => handleCardClick(relatedProduct, allProducts, navigate)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedItems;
