import React, { Component } from 'react';
import styles from './CategoryButton.css';
import { Button } from 'react-bootstrap';

const CategoryButton = ({ name, onClick, categories, value }) => {
  const realValue = value || name;

  const isSelected = categories[realValue];
  return (
    <Button
      bsStyle={isSelected ? 'success' : 'default'}
      block
      onClick={() => onClick(realValue)}
    >
      {name}
    </Button>
  );
};

export default CategoryButton;
