import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import Text from 'components/Text/Text';
import styles from './ProductPage.module.scss'; 
import { ProductI } from 'modules/types';
import Loader from 'components/Loader'; 
import '../../styles/styles.scss';
import ImageSlider from './components/ImageSlider.tsx/ImageSlider';
import ProductDetails from './components/ProductDetails/ProductDetails';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';

const ProductPage = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState<ProductI | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductI[]>([]);
    const [allProducts, setAllProducts] = useState<ProductI[]>([]);
    const { products } = location.state || {};
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (id) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
                    setProductDetails(response.data);
                } catch (error) {
                    console.error("Ошибка загрузки данных товара:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProductDetails();
    }, [id]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            if (!products) {  // Если `products` не переданы через `location.state`
                try {
                    const response = await axios.get(`https://api.escuelajs.co/api/v1/products`);
                    setAllProducts(response.data);
                } catch (error) {
                    console.error("Ошибка загрузки всех товаров:", error);
                }
            }
        };

        fetchAllProducts();
    }, [products]);

    useEffect(() => {
        if (productDetails && productDetails.category) {
            const currentProducts = products || allProducts; // Используем переданные или загруженные `products`

            const sameCategoryProducts = currentProducts
                .filter((p: ProductI) => p.category.name === productDetails.category.name && p.id !== productDetails.id)
                .slice(0, 7);

            const selectedProducts = sameCategoryProducts
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            if (selectedProducts.length < 3) {
                const additionalProducts = currentProducts
                    .filter((p: ProductI) => !selectedProducts.some((sp: ProductI) => sp.id === p.id) && p.id !== productDetails.id)
                    .slice(0, 7)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3 - selectedProducts.length);

                setRelatedProducts([...selectedProducts, ...additionalProducts]);
            } else {
                setRelatedProducts(selectedProducts);
            }
        }
    }, [productDetails, products, allProducts]);

    if (loading) {
        return (
            <main className="page">
                <div className="page__loader">
                    <Loader /> 
                </div>
            </main>
        );
    }

    if (!productDetails) return <div>Товар не найден</div>;

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
                        <ImageSlider product={productDetails} />
                        <ProductDetails product={productDetails} />
                    </div>
                    <RelatedProducts relatedProducts={relatedProducts} allProducts={products || allProducts} />
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
