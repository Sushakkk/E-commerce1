// Filters.tsx
import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import styles from './Filters.module.scss';

interface FiltersProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles['products__controls']}>
      <div className={styles['products__search']}>
        <div className={styles['products__search-column--left']}>
          <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
        </div>
        <Button  className={styles['products__search-column--right']}>
          Find now
        </Button>
      </div>
      <div className={styles['products__filter']}>
        <MultiDropdown
          options={[
            { key: '1', value: 'Furniture' },
            { key: '2', value: 'Electronics' },
          ]}
          value={[]}
          onChange={() => {}}
          getTitle={() => 'Filter'}
        />
      </div>
    </div>
  );
};

export default Filters;
