import React, { memo } from 'react';

const Habit = memo(({ habit, onIncrement, onDecrement, onDelete }) => {
  const handleIncrement = () => {
    onIncrement(habit);
  };

  const handleDecrement = () => {
    onDecrement(habit);
  };

  const handleDelete = () => {
    onDelete(habit);
  };

  return (
    <li className="habit">
      <span className="habit-name" data-testid="habit-name">{habit.name}</span>
      <span className="habit-count" data-testid="habit-count">{habit.count}</span>
      <button className="habit-button habit-increase" onClick={handleIncrement} title="increase">
        <i className="fas fa-plus-square"></i>
      </button>
      <button className="habit-button habit-decrease" onClick={handleDecrement} title="decrease">
        <i className="fas fa-minus-square"></i>
      </button>
      <button className="habit-button habit-delete" onClick={handleDelete} title="delete">
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
});

export default Habit;
