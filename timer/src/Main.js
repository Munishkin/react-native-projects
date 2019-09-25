import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native';
  import uuid from 'uuid/v1';
  import TimerAddForm from './components/TimerAddForm';
  import Timer from './components/Timer';
  import TimerForm from './components/TimerForm';
  import timeToHuman from './utils/timeToHuman';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      timers: [
        {
          id: uuid(),
          title: 'Ponder about creation',
          category: 'Life chores',
          elapsed: 8499000,
          isRunning: false
        }
      ],
      isOpen: false
    }
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  componentDidMount() {
    const TIMER_INTERVAL = 1000;
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
      this.setState({ timers: timers.map(timer => {
        if (timer.isRunning) {
          return {
            ...timer,
            elapsed: timer.elapsed + TIMER_INTERVAL
          }}
        return timer;
      })})
    }, TIMER_INTERVAL);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleRemove(id) {
    const { timers } = this.state;
    filteredTimers = timers.filter(timer => timer.id !== id);
    this.setState({ timers: [...filteredTimers] });
  }

  submitForm({id, title, category}) {
    const { timers } = this.state;
    const timer = timers.filter(timer => timer.id === id)[0];
    if (timer) {
        this.setState({timers: timers.map(timer => {
        if (timer.id === id) {
          return { id, title, category, elapsed: timer.elapsed,
            isRunning: false }};
        return timer;
      })
    });
    } else {
      this.setState({timers: [...timers, { id, title, category,
        elapsed: 0,
        isRunning: false
      }]});
    }
  }
  toggleAddForm() {
    const isOpen = this.state.isOpen;
    this.setState({isOpen: !isOpen});
  }

  toggleTimer(id) {
    const { timers } = this.state;
    this.setState({ timers: timers.map(timer => {
      if (timer.id === id) {
        return { ...timer, isRunning: !timer.isRunning }
      }
      return timer;
    })});
  }
  render() {
    const { timers, isOpen} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView>
        <View style={styles.topHeader}>
          <Text style={styles.textBold}>Timers</Text>
        </View>
        <TimerAddForm isOpen={isOpen} toggleForm={this.toggleAddForm} onSubmit={this.submitForm}/>
        {timers.map(timer => (
          <Timer
            key={timer.id}
            id={timer.id}
            isRunning={timer.isRunning}
            title={timer.title}
            category={timer.category}
            elapsed={timeToHuman(timer.elapsed)}
            onRemove={this.handleRemove}
            onSubmit={this.submitForm}
            onTimer={this.toggleTimer} />
          ))}
        </ScrollView>
        </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topHeader: {
    paddingVertical: 15,
    paddingTop: 30,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  textBold: {
    fontSize:20,
    fontWeight: 'bold'
  }
});
