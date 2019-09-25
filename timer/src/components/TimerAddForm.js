import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TimerForm from './TimerForm';

export default class TimerAddForm extends Component {
  render() {
    const { isOpen, toggleForm, onSubmit } = this.props;
    if (isOpen) {
        return (
          <TimerForm onCancel={toggleForm} onSubmit={onSubmit}/>
        )
      }
      return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={toggleForm}>
        <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  button: {
    padding: 10,
    minWidth: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
