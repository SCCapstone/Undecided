import * as React from 'react';
import FoodSearchScreen from '../../Screens/FoodSearchScreen';
import {render, screen, fireEvent,} from '@testing-library/react-native';
describe('FoodSearchScreenBehavioral', () => {
  const thisRoute = { params: 'breakfast' };
  beforeEach(() => {
    var wrapper = render(<FoodSearchScreen route={thisRoute}/>);
  });
  it('Renders results based on user input', async () => {
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'ham');
    fireEvent(searchInput, 'onEndEditing');
    const results = screen.getAllByTestId('foodList');
    expect(results).not.toBeNull();
  });
});