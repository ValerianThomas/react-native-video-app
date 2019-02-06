/* eslint-disable no-undef */
import { ENDPOINT } from '../Utils/config'

export const postVideo = (video) => {
  let formdata = new FormData()
  formdata.append('video', {
    name: 'mobile-video-upload',
    type: `video/${video.codec}`,
    uri: video.uri
  })
  return new Promise((resolve, reject) => {
    fetch(`${ENDPOINT}/video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formdata
    })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getVideo = () => {
  return new Promise((resolve, reject) => {
    fetch(`${ENDPOINT}/video`)
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
