import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import uuid from 'uuid/v1';
import Button from './Button';

export default class TimerForm extends Component {
  constructor(props) {
    super(props);
    const { title, category, id } = this.props;
    this.state = {
      title: title || '',
      category: category || '',
      id: id || uuid()
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  handleCategoryChange(value) {
    this.setState({category: value})
  }
  handleTitleChange(value) {
    this.setState({title: value});
  }
  handleSubmit() {
    const {title, category, id } = this.state;
    const { onCancel, onSubmit } = this.props;
    onSubmit({title, category, id});
    onCancel();
  }
  render () {
    const { onCancel, id } = this.props;
    const { title, category } = this.state;
    let createText = 'Create';
    if(id) {
      createText = 'Update';
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Title</Text>
        <TextInput value={title} onChangeText={this.handleTitleChange} style={styles.textInput} />
        <Text style={styles.text}>Category</Text>
        <TextInput value={category} onChangeText={this.handleCategoryChange} style={styles.textInput} />
        <View style={styles.buttonGroup}>
          <Button title={createText} color='green' onPress={this.handleSubmit} />
          <Button title='Cancel' color='red' onPress={onCancel} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#d0d6d9',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    padding: 20
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 7,
    paddingVertical: 3
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
