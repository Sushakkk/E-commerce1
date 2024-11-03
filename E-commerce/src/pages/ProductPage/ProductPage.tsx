import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import '../HomePage/HomePage.css';
import './ProductPage.css';
import { ProductI } from 'pages/HomePage/HomePage';
import Button from 'components/Button';

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, products } = location.state || {};


    // Получаем три первых продукта, исключая выбранный продукт
    const relatedProducts = products
        .filter((p: ProductI) => p.id !== product.id) // Исключаем выбранный продукт
        .slice(0, 3); // Берем первые три оставшихся

    return (
        <main id="main" className="page">
            <div className="page__product _container">
                <div className="product__button-container">
                    <div className="product__buttton_back" onClick={() => navigate(-1)}>
                        <PaginationIcon />
                        <Text view="p-20">Назад</Text>
                    </div>
                </div>

                <div className="product__content">
                    
                <div className="ProductContentWrapper">
            <img
              src={product.images[0]}
              alt={product.title}
              className="ProductImage"
              style={{ width: '50%', maxWidth: '400px' }}
            />
            <div className="product__text-container">
              <div className="product__text_title">
                <Text view="title" weight="bold">
                    {product.title}
                </Text>
                <Text view="p-20" color='secondary'>
                {product.description}
              </Text>
                
              </div>
              <div className="product__price">
              <Text view="title" className="page-title-price" weight="bold">
                ${product.price}
              </Text>
              <div className="product__buttons">
                <Button  width='135px' className="buy-now-button">Buy Now</Button>
                <Button className="add-to-cart-button">Add to cart</Button>
              </div>
              </div>
            </div>
          </div>


                    {/* Три связанных продукта */}
                    <div className="product__related-cards">
                        <Text view="p-32" className="product__title" weight="bold">
                            Related Products
                        </Text>
                        <div className="related-products _cards">
                            {relatedProducts.map((relatedProduct : ProductI) => (
                                <Card
                                    key={relatedProduct.id}
                                    image={relatedProduct.images[0]}
                                    title={relatedProduct.title}
                                    subtitle={relatedProduct.description}
                                    captionSlot={relatedProduct.category.name}
                                    contentSlot={`$${relatedProduct.price}`}
                                    actionSlot={<Button>Add to Cart</Button>}
                                    className="related-product-card"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
