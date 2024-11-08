import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import Text from 'components/Text/Text';
import styles from './ProductPage.module.scss'; 
import { ProductI } from 'modules/types';
import Loader from 'components/Loader'; 
import '../../styles/styles.scss'
import RelatedProducts from 'components/RelatedProducts/RelatedProducts';
import ProductDetails from 'components/ProductDetails/ProductDetails';
import ImageSlider from 'components/ImageSlider.tsx/ImageSlider';

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [allProducts, setAllProducts] = useState<ProductI[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<ProductI[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 


    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true); 
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/products');
                setAllProducts(response.data);
            } catch (error) {
                console.error("Ошибка загрузки продуктов:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchAllProducts();
    }, []);


    useEffect(() => {
        if (allProducts.length > 0) {
            const sameCategoryProducts = allProducts
                .filter((p) => p.category.name === product.category.name && p.id !== product.id)
                .slice(0, 7);

            const selectedProducts = sameCategoryProducts
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            if (selectedProducts.length < 3) {
                const additionalProducts = allProducts
                    .filter((p) => !selectedProducts.some((sp) => sp.id === p.id) && p.id !== product.id)
                    .slice(0, 7)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3 - selectedProducts.length);

                setRelatedProducts([...selectedProducts, ...additionalProducts]);
            } else {
                setRelatedProducts(selectedProducts);
            }
        }
    }, [allProducts, product]);


    if (loading) return ( 
        <main className="page">
            <div className='page__loader'>
                <Loader /> 
            </div>
        </main>
    );

    return (
        <main id="main" className="page">
            <div className={styles.page__product}>
                <div className={styles['product__button-container']}>
                    <div className={styles.product__button_back} onClick={() => navigate('/')}>
                        <PaginationIcon />
                        <Text view="p-20">Назад</Text>
                    </div>
                </div>

                <div className={styles.product__content}>
                    <div className={styles.product__wrapper}>
                        <ImageSlider product={product}/>
                        <ProductDetails product={product}/>
                    </div>
                    <RelatedProducts relatedProducts={relatedProducts} allProducts={allProducts} />
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
