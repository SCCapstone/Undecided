import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';
import { COLORS } from '../constants/colors';
import { Pressable } from 'react-native';

const CalorieTracker = ({ calorieGoal, caloriesRemaining, navigate, currentWeight }) => {
  const [calorieCount, setCalorieCount] = useState(0);

  const diary = useContext(DiaryContext);

  console.log(diary.diary)
  

  const percentage = Math.round(100- ((caloriesRemaining / calorieGoal) * 100));

  return (
    <Pressable onPress={navigate} style={styles.container}>
      <Text style={styles.heading}>Calorie Tracker</Text>
      <Text>Calorie goal: {calorieGoal}</Text>
      <Text>Calories remaining: {caloriesRemaining}</Text>
      <Text>Percentage of goal: {percentage}%</Text>
      <Text>Current Weight: {currentWeight} Kg</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.wood,
    height: 20,
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