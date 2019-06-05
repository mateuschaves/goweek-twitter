import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    username: "",
    switch: true,
    sex: "Feminino",
    age: null
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem("@GoTwitter:username");

    if (username) {
      this.navigateToTimeline();
    }
  }

  handleInputChange = username => {
    this.setState({ username });
  };

  handleLogin = async () => {
    const { username, age, sex } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem("@GoTwitter:username", username);
    await AsyncStorage.setItem("@GoTwitter:age", age);
    await AsyncStorage.setItem("@GoTwitter:sex", sex);

    this.navigateToTimeline();
  };

  navigateToTimeline = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Timeline" })]
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            placeholderTextColor="white"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />

          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            placeholder="Idade"
            keyboardType={"numeric"}
            value={this.state.age}
            onChangeText={age => this.setState({ age })}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginTop: 15,
              marginBottom: 15,
              color: "#fff"
            }}
          >
            {this.state.sex}
          </Text>
          <Switch
            value={this.state.switch}
            onValueChange={() =>
              this.setState({
                switch: !this.state.switch,
                sex: !this.state.switch ? "Feminino" : "Masculino"
              })
            }
          />

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(16, 23, 30)"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30,
    color: "white"
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
