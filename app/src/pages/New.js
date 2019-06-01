import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../services/api";

import AsyncStorage from "@react-native-community/async-storage";

export default class New extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newTweet: ""
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  handleNewTweet = async () => {
    this.goBack();

    const content = this.state.newTweet;
    const author = await AsyncStorage.getItem("@GoTwitter:username");

    api.post("tweets", { author, content });
  };

  handleInputChange = newTweet => {
    this.setState({ newTweet });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#4BB0EE" />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleNewTweet} style={styles.button}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          autoFocus
          placeholder="O que está acontecendo?"
          value={this.state.newTweet}
          onChangeText={this.handleInputChange}
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={this.handleNewTweet}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});
