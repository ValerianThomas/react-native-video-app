/* eslint-disable no-undef */

import React, { Component } from 'react'
import { Container, Content, List, ListItem, Text } from 'native-base'
import { TouchableOpacity, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import { getVideo } from '../Services/video'

export default class Main extends Component {
  state = {
    data: null,
    success: false,
    error: '',
    loading: false
  }
  componentDidMount () {
    this.fetchVideo.bind(this)
    setInterval(this.fetchVideo.bind(this), 5000)
  }

  fetchVideo () {
    this.setState({
      loading: true, success: false
    }, () => {
      getVideo()
        .then(data => {
          this.setState({ data: data, success: true, loading: false })
        })
        .catch(error => {
          this.setState({ error, loading: false })
        })
    })
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Content>
            <List>
              {
                this.state.data && this.state.data.map((item, index) => {
                  return (
                    <ListItem key={index}>
                      <TouchableOpacity onPress={() => { this.props.navigation.navigate('Video', { url: item.url }) }}>
                        <Text>{`video ${index}`}</Text>
                      </TouchableOpacity>
                    </ListItem>

                  )
                })
              }
            </List>
          </Content>
        </Container>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.props.navigation.navigate('Camera')
          }}
        />
      </View>
    )
  }
}
