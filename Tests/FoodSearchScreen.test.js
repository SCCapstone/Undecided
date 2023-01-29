import * as React from 'react';
import FoodSearchScreen from '../Screens/FoodSearchScreen';
import {render, screen, fireEvent,} from '@testing-library/react-native';
describe('FoodSearchScreen', () => {
  const thisRoute = { params: { meal: 'breakfast' }};
  beforeEach(() => {
    var wrapper = render(<FoodSearchScreen route={thisRoute}/>);
  });
  it('ham search returns results', async () => {
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'ham');
    fireEvent(searchInput, 'onEndEditing');
    const results = screen.getAllByTestId('foodList');
    expect(results).not.toBeNull();
  });
});