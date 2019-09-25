import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Button extends Component {
  render() {
    const { title, color, onPress } = this.props;
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, color == 'blue' ? styles.buttonBorderBlue: color == 'green' ? styles.buttonBorderGreen: styles.buttonBorderRed]}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    marginTop: 10,
    minWidth: 100,
    height:30,
    borderWidth: 1,
    borderRadius: 5
  },
  buttonBorderBlue: {
    borderColor: '#4e7f9d'
  },
  buttonBorderGreen: {
    borderColor: '#239f85'
  },
  buttonBorderRed: {
    borderColor: '#d43f34'
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
