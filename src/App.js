import React, { Component } from "react"
import protooClient from "protoo-client"
import { StyleSheet, Text, TouchableOpacity, TextInput, Button, View, ScrollView } from "react-native"
import { button, container, rtcView, text } from "./styles"
import { log, logError } from "./debug"

import { applyMiddleware as applyReduxMiddleware, createStore as createReduxStore } from "redux"
import RoomClient from "./lib/RoomClient"
import * as mediasoupClient from "mediasoup-client"
import reducers from "./lib/redux/reducers"
import * as stateActions from './lib/redux/stateActions';
import thunk from "redux-thunk"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from "react-native-webrtc"
import { getProtooUrl } from "./lib/urlFactory"

class App extends Component {
  constructor(props) {
    super(props)
    console.info("")
    console.info("")
    console.info("")
    console.info("")
    console.info("----------------APP初始化--------------")
    // webrtc api
    registerGlobals()

    // global.RTCPeerConnection = RTCPeerConnection
    // global.RTCIceCandidate = RTCIceCandidate
    // global.RTCSessionDescription = RTCSessionDescription
    // global.MediaStream = MediaStream
    // global.MediaStreamTrack = MediaStreamTrack
    // global.RTCView = RTCView
    // global.navigator.mediaDevices = mediaDevices
    global.navigator.product = "ReactNative"
    global.myapp = this
    const peerName = "myphone" + Math.random().toFixed(2) * 100
    const roomId = "myroomid"
    const displayName = "myphone"
    const useSimulcast = true
    const forceTcp = false
    const spy = false
    const forceH264 = false

    const reduxMiddlewares = [thunk]
    const store = createReduxStore(reducers, undefined, applyReduxMiddleware(...reduxMiddlewares))

    RoomClient.init({ store })
    console.log("状态管理库store", store)
    var device = mediasoupClient.getDeviceInfo()

    global.mystore = store
    window.mystore = store
    // const protooUrl = getProtooUrl(peerName, roomId, forceH264)
    // const protooTransport = new protooClient.WebSocketTransport(protooUrl)
    // const room = new mediasoupClient.Room({
    //   requestTimeout: 30000,
    //   transportOptions: {
    //     udp: !forceTcp,
    //     tcp: Boolean(forceTcp)
    //   }
    // })
    // room
    //   .join(peerName, { displayName, device })
    //   .then(() => {
    //     // NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
    //     //
    //     // Just get access to the mic and DO NOT close the mic track for a while.
    //     // Super hack!
    //     console.info("加入房间:", peerName, { displayName, device })
    //     return navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    //       const audioTrack = stream.getAudioTracks()[0]

    //       audioTrack.enabled = false

    //       setTimeout(() => audioTrack.stop(), 120000)
    //     })
    //   })
    //   .catch(error => {
    //     console.error("加入房间失败:%o", error)
    //   })
    let displayNameSet = false;
    store.dispatch(stateActions.setMe({ peerName, displayName, displayNameSet, device }))
    console.log("初始化参数：", roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264)
    var roomClient = new RoomClient({ roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264 })
    //console.log("在初始化RoomClient之后", roomClient)
    // NOTE: For debugging.
    //global.CLIENT = roomClient
  }
  state = {
    info: "初始化",
    status: "init",
    roomID: "abc",
    isFront: true,
    streamURL: null,
    remoteList: {}
  }
  render() {
    const { status, info, streamURL, remoteList } = this.state
    const st = mystore.getState()
    const room = JSON.stringify(st.room)
    const me = JSON.stringify(st.me)
    const producers = JSON.stringify(st.producers)
    const peers = JSON.stringify(st.peers)
    const consumers = JSON.stringify(st.consumers)
    const notifications = JSON.stringify(st.notifications)
    return (
      <ScrollView>
        <RTCView style={styles.box} streamURL={this.state.videoURL} />
        <Text>房间：{room}</Text>
        <Text>我：{me}</Text>
        <Text>生产者：{producers}</Text>
        <Text>设备：{peers}</Text>
        <Text>消费者：{consumers}</Text>
        <Text>通知：{notifications}</Text>
        <Text>{this.state.info}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 400,
    backgroundColor: "lightgray"
  }
})

export default App
