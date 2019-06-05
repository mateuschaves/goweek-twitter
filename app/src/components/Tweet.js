import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import api from "../services/api";

import Icon from "react-native-vector-icons/Ionicons";

export default class Tweet extends Component {
  handleLike = async () => {
    const { tweet } = this.props;

    await api.post(`likes/${tweet._id}`);
  };

  render() {
    const { tweet } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.author}>{tweet.author}</Text>
        <Text style={styles.content}>{tweet.content}</Text>

        <TouchableOpacity onPress={this.handleLike} style={styles.likeButton}>
          <Icon name="ios-heart-empty" size={20} color="#999" />
          <Text style={styles.likeText}>{tweet.likes}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    borderBottomWidth: 1,
    backgroundColor: "rgb(28, 41, 56)"
  },

  author: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },

  content: {
    marginLeft: 20,
    fontSize: 15,
    lineHeight: 20,
    color: "white",
    marginVertical: 10
  },

  likeButton: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center"
  },

  likeText: {
    color: "#999",
    marginLeft: 20
  }
});
