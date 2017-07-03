import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const RadioButton = ({ name, onClick, value, sortBy }) => {
  let isSelected;
  if (value === sortBy) {
    isSelected = true;
  }
  return (
    <Button
      bsStyle={isSelected ? 'success' : 'default'}
      block
      onClick={() => onClick(value)}
    >
      {name}
    </Button>
  );
};

export default RadioButton;
