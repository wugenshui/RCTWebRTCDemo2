import React, { Component } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { button, container, rtcView, text } from "./styles"
import { log, logError } from "./debug"

import { applyMiddleware as applyReduxMiddleware, createStore as createReduxStore } from "redux"
import RoomClient from "./lib/RoomClient"
import { getDeviceInfo } from "mediasoup-client"
import reducers from "./lib/redux/reducers"
import thunk from "redux-thunk"
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   registerGlobals
// } from 'react-native-webrtc';

class App extends Component {
  state = {
    info: "Initializing",
    status: "init",
    roomID: "abc",
    isFront: true,
    streamURL: null,
    remoteList: {}
  }
  render() {
    const { status, info, streamURL, remoteList } = this.state
    //console.log('registerGlobals', registerGlobals)
    //registerGlobals()
    const peerName = "mypeername" + Math.random()
    const roomId = "myroomid"
    const displayName = "chenbo"
    const useSimulcast = true
    const forceTcp = false
    const spy = false
    const forceH264 = false

    const reduxMiddlewares = [thunk]
    const store = createReduxStore(reducers, undefined, applyReduxMiddleware(...reduxMiddlewares))

    RoomClient.init({ store })
    const device = getDeviceInfo()

    console.log(roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264)
    var roomClient = new RoomClient({ roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264 })
    console.log("roomClient", roomClient)
    return (
      <View>
        <Text>hello world</Text>
      </View>
    )
  }
}

export default App
