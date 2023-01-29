import * as React from 'react';
import FoodSearchScreen from '../Screens/FoodSearchScreen';
import {render, screen, fireEvent} from '@testing-library/react-native'

describe('FoodSearchScreen', () => {
  it('ham search returns results', async () => {
    render(FoodSearchScreen({route: {params: {meal: 'Breakfast'}}}))
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'ham');
    searchInput.onEndEditing();
    const results = await screen.findAllByTestId('searchResult');
    console.log(results);
  });
});