import React from 'react';

export const FruitList = jest.fn(({ fruits, onEdit, onDelete }) => (
  <div data-testid="fruit-list">
    {fruits.map((fruit) => (
      <div key={fruit} data-testid={`fruit-item-${fruit}`}>
        {fruit}
        <button onClick={() => onEdit(fruit)}>Edit</button>
        <button onClick={() => onDelete(fruit)}>Delete</button>
      </div>
    ))}
  </div>
));

export const FruitForm = jest.fn(({ onSubmit }) => (
  <form
    data-testid="fruit-form"
    onSubmit={(e) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit('Test Fruit');
      }
    }}
  >
    <input data-testid="fruit-input" />
    <button type="submit">Submit</button>
  </form>
)); 