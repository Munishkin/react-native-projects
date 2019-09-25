import React, { Component } from 'react';
import PropTypes from 'prop';
import { View, TextInput, StyleSheet } from 'react-native';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.changeText = this.changeText.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
  }

  changeText (text) {
    this.setState({text});
  }

  submitLocation() {
    const { text } = this.state;
    const { onSubmit } = this.props;
    if(!text) return;
    onSubmit(text);
    this.setState({text: ''})
  }

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        value={text}
        placeholderTextColor='white'
        underlineColorAndroid='transparent'
        onChangeText={this.changeText}
        onSubmitEditing={this.submitLocation}
        style={styles.input} />
      </View>
    )
  }
}

SearchInput.proptypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 40,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#666'
  },
  input: {
    flex: 1,
    color: 'white'
  }
});
