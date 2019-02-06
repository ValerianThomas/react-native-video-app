import React, { Component } from 'react'
import { RNCamera } from 'react-native-camera'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { postVideo } from '../Services/video'

export default class BadInstagramCloneApp extends Component {
  state = {
    data: [],
    active: false,
    loading: false
  }

  button () {
    if (!this.state.active && !this.state.loading) {
      return (
        <TouchableOpacity onPress={this.startVideo.bind(this)} style={styles.capture}>
          <Text style={{ fontSize: 14 }}>RECORD</Text>
        </TouchableOpacity>
      )
    } else if (this.state.loading) {
      return (
        <View style={styles.capture}>
          <ActivityIndicator style={{ fontSize: 14 }} />
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.stopVideo.bind(this)} style={styles.capture}>
          <Text style={{ fontSize: 14 }}>STOP</Text>
        </TouchableOpacity>
      )
    }
  }
  startVideo () {
    this.setState({ active: true })
    this.camera.recordAsync()
      .then(video => {
        this.setState({ active: false, loading: true })
        postVideo(video)
          .then(res => {
            this.setState({ loading: false, active: false })
          })
          .catch(error => {
            this.setState({ loading: false, active: false })
            alert(`something went wrong ${error}`)
          })
      })
  }

  stopVideo () {
    this.camera.stopRecording()
  }
  render () {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          {this.button()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})
