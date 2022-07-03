import React from 'react';
import { render, screen } from '@testing-library/react';
import HabitAddForm from '../habitAddForm';
import userEvent from '@testing-library/user-event';

describe("HabitAddForm", () => {
    let onAdd;
    let input;
    let button;
    beforeEach(() => {
        onAdd = jest.fn();
        render(<HabitAddForm onAdd={onAdd} />);
        input = screen.getByPlaceholderText('Habit');
        button = screen.getByText('Add');
    })
    it('calls onAdd when button is clicked and valid habit is entered', () => {
        userEvent.type(input, 'New Habit');
        userEvent.click(button);

        expect(onAdd).toHaveBeenCalledWith('New Habit');
    });
    it('doen not call onAdd when the habit is empty', () => {
        userEvent.type(input, '');
        userEvent.click(button);

        expect(onAdd).toHaveBeenCalledTimes(0);
    })
})