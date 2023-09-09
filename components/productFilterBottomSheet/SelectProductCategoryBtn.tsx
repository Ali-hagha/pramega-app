import React from 'react';
import { Categories } from '../../types/types';
import FilterBtn from './FilterBtn';

interface Props {
  title: string;
  category: Categories;
  categoryState: [Categories, React.Dispatch<React.SetStateAction<Categories>>];
}

const SelectProductCategoryBtn = ({
  title,
  category,
  categoryState,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = categoryState;
  const isActive = selectedCategory === category;

  const handlePress = () => {
    setSelectedCategory(category);
  };

  return <FilterBtn title={title} isActive={isActive} onPress={handlePress} />;
};

export default SelectProductCategoryBtn;
