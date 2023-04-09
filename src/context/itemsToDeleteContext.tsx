import { createContext } from 'react';
import { ProductType } from '../types';

type ItemsToDeleteContextType = {
    itemsToDelete: string[];
    setItemsToDelete: (value: string[]) => void;
    products: ProductType[];
    setProducts: (value: ProductType[]) => void;
  }

const ItemsToDeleteContext = createContext<ItemsToDeleteContextType>({
    itemsToDelete: [],
    setItemsToDelete: () => {},
    products: [],
    setProducts: () => {},
});

export default ItemsToDeleteContext