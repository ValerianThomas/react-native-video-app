import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video'
export default class VideoWatcher extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Video source={{ uri: this.props.navigation.getParam('url') }}
          ref={(ref) => {
            this.player = ref
          }}
          style={styles.backgroundVideo} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
