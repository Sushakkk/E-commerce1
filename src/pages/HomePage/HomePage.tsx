import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import { useNavigate } from 'react-router-dom';
import { handleCardClick } from 'utils/navigationUtils';
import styles from './HomePage.module.scss';
import '../../styles/styles.scss'
import { ProductI } from 'modules/types';
import Pagination from './components/Pagination/Pagination';
import ProductList from './components/ProductList/ProductList';
import Filters from './components/Filters/Filters';



const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 9;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: { offset: (page - 1) * productsPerPage, limit: productsPerPage },
      });
      setProducts(response.data);

      const totalResponse = await axios.get('https://api.escuelajs.co/api/v1/products', { params: { limit: 0 } });
      setTotalProducts(totalResponse.data.length);
    } catch{
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  

  if (loading) return (
    <main className='page'>
      <div className='page__loader'>
        <Loader />
      </div>
      </main>
  );
  if (error) return <div className={styles['error-message']}>{error}</div>;

  return (
    <main id="main" className='page'>
      <div className={styles['page__main-block']}>
        <div className={styles['products__content']}>
          <div className={styles['products__header']}>
            <div className={styles['products__title']}>
              <Text view="title">Products</Text>
            </div>
            <div className={styles['products__description']}>
              <Text view="p-20" color="secondary">
                We display products based on the latest products we have. If you want to see our old products, please enter the name of the item.
              </Text>
            </div>
          </div>
          <Filters searchValue={searchValue} setSearchValue={setSearchValue} />
          <div className={styles['products__body']}>
            <div className={styles['products__subtitle']}>
              <Text view="p-32" className="page-title" weight="bold">Total Products</Text>
              <Text view="p-20" color="accent" weight="bold">{totalProducts}</Text>
            </div>
             <ProductList products={products} />
          </div>

          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
