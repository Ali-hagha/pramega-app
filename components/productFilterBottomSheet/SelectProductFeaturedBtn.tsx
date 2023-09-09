import React from 'react';
import { Featured } from '../../types/types';
import FilterBtn from './FilterBtn';

interface Props {
  title: string;
  featured: Featured;
  featuredState: [Featured, React.Dispatch<React.SetStateAction<Featured>>];
}

const SelectProductFeaturedBtn = ({
  title,
  featured,
  featuredState,
}: Props) => {
  const [selectedFeatured, setSelectedFeatured] = featuredState;
  const isActive = selectedFeatured === featured;

  const handlePress = () => {
    setSelectedFeatured(featured);
  };

  return <FilterBtn title={title} isActive={isActive} onPress={handlePress} />;
};

export default SelectProductFeaturedBtn;
