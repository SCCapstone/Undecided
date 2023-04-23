import React from 'react';
import { View, Text } from 'react-native';
import { DiaryContext } from '../Contexts/DiaryContext';
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const FoodSummary = (food) => {

  const isEmpty = food.food.length === 0;
  const category = food.category.charAt(0).toUpperCase() + food.category.slice(1)
  if (isEmpty) {
    return (
    <View style={styles.container}>
      <Text style = {styles.category}>{category}</Text>
      <Text style={styles.category}>No food added!</Text>
    </View>
    )
  }

  var { name, servings, calories } = food.food[food.food.length -1];
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return (
    <View style={styles.container}>
      <Text style = {styles.category}>{category}</Text>
      <Text style={styles.details}>{name}</Text>
      <Text style={styles.details}>Servings: {servings}</Text>
      <Text style={styles.details}>Calories: {calories}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'white',
    margin : 2,
    width: '80%',
    height: 80,
    borderRadius: 10,
    elevation: 10,
  },
  category: {
    alignSelf: 'center',
  },
  details: {
    marginLeft: 4
  }
});
export default FoodSummary;