import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import TimerForm from './TimerForm';

export default class Timer extends Component {
  constructor() {
    super();
    this.state ={
      edit: false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  handleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }
  handleRemove() {
    const { onRemove, id } = this.props;
    onRemove(id);
  }
  handleTimer() {
    const {onTimer, id } = this.props;
    onTimer(id);
  }

  render() {
    const { title, category, elapsed, id, onSubmit, isRunning } = this.props;
    const { edit } = this.state;
    let timerText = 'Start';
    if (isRunning) {
      timerText = 'Stop';
    }
    if (edit) {
      return (
        <TimerForm title={title}
        category={category}
        id={id}
        onCancel={this.handleEdit}
        onSubmit={onSubmit}
        />
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{elapsed}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button title='Edit' color='blue' onPress={this.handleEdit} />
          <Button title='Remove' color='blue' onPress={this.handleRemove} />
        </View>
        <Button title={timerText} color='green' onPress={this.handleTimer} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e6e9ed'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  category: {
    fontSize: 14
  },
  timerContainer: {
    padding:20
  },
  timerText: {
    fontSize:28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
