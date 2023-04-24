import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { DiaryContext } from '../Contexts/DiaryContext';
import { COLORS } from '../constants/colors';
import { Pressable } from 'react-native';
import FoodSummary from './FoodSummary';
import Food from '../Classes/Food';

const CalorieTracker = ({ calorieGoal, caloriesRemaining, navigate }) => {
  var diary = useContext(DiaryContext);
  const [calorieCount, setCalorieCount] = useState(0);
  var breakfast =[];
  var lunch=[];
  var dinner = [];


  if(Object.keys(diary.diary).length > 0 && diary.diary !== []) {
    if (diary.diary.diary.length > 0) {
      breakfast = (diary.diary.diary[0].breakfast);
      lunch = (diary.diary.diary[0].lunch);
      dinner = (diary.diary.diary[0].dinner);
    }
  }
  const percentage = Math.round(100- ((caloriesRemaining / calorieGoal) * 100));

  return (
    <Pressable onPress={navigate} style={styles.container}>
      <Text style={styles.heading}>Calorie Tracker</Text>
      <Text>Calorie goal: {calorieGoal}</Text>
      <Text>Calories remaining: {caloriesRemaining}</Text>
      <Text>Percentage of goal: {percentage}%</Text>
      <FoodSummary food={breakfast} category = "breakfast" />
      <FoodSummary food={lunch} category="lunch" />
      <FoodSummary food={dinner} category="dinner" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.wood,
    height: 10,
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