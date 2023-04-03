import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';

const CalorieTracker = ({ calorieGoal }) => {
  const [calorieCount, setCalorieCount] = useState(0);

  const diary = useContext(DiaryContext);

  console.log(diary.diary)
  

  const incrementCalories = () => {
    setCalorieCount(calorieCount + 1);
  };

  const decrementCalories = () => {
    setCalorieCount(calorieCount - 1);
  };

  const percentage = Math.round((calorieCount / calorieGoal) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Calorie Tracker</Text>
      <Text>Calorie goal: {calorieGoal}</Text>
      <Text>Calories consumed: {calorieCount}</Text>
      <Text>Percentage of goal: {percentage}%</Text>
      <Button title="+" onPress={incrementCalories} />
      <Button title="-" onPress={decrementCalories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '10%',
    width: '50%',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default CalorieTracker;