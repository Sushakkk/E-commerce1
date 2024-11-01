import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import './HomePage.css'


interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Получение данных из API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data.slice(0, 9)); 
      } catch (error) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <main id="main" className="page">
      <div className="page__main-block _container">
        <div className="main-content">
          <div className="main-block__body">
            <div className="products">
              <div className="products__search">
                <Input
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search product"
                />
                <Button className="button-page">Find now</Button>
              </div>

              {/* Компонент фильтра */}
              <div className="products__filter">
                <MultiDropdown
                  options={[{ key: '1', value: 'Furniture' }, { key: '2', value: 'Electronics' }]}
                  value={[]}
                  onChange={() => {}} // Реализуйте логику фильтрации здесь
                  getTitle={() => 'Filter'}
                />
              </div>
            </div>

            <div className="products__content">
              <Text tag="h1" view="title" className="page-title" weight="bold">
                Total Products
              </Text>

              <section className="products__cards">
                {products.map(product => (
                  <div className="products__column" key={product.id}>
                    <Card
                      image={product.images[0]}
                      title={product.title}
                      subtitle={`$${product.price}`}
                      captionSlot={product.category.name}
                      actionSlot={<Button className="add-to-cart-button">Add to Cart</Button>}
                      className="products__card" // Передаем класс для стилизации карточки
                    />
                  </div>
                ))}
              </section>
            </div>

            {/* Пагинация будет добавлена позже */}
            <div className="products__pagination">
              <ArrowDownIcon className="products__pagination-left" />
              <div className="products__pagination-buttons">
                <Button className="active-page">1</Button>
                <Button className="active-page">2</Button>
                <Button className="active-page">3</Button>
              </div>
              <ArrowDownIcon className="products__pagination-right" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
