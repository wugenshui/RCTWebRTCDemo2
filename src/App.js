import React, { Component } from "react"
import protooClient from "protoo-client"
import { Text, TouchableOpacity, View } from "react-native"
import { button, container, rtcView, text } from "./styles"
import { log, logError } from "./debug"

import { applyMiddleware as applyReduxMiddleware, createStore as createReduxStore } from "redux"
import RoomClient from "./lib/RoomClient"
import * as mediasoupClient from "mediasoup-client"
import reducers from "./lib/redux/reducers"
import thunk from "redux-thunk"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia
} from "react-native-webrtc"
import { getProtooUrl } from "./lib/urlFactory"

class App extends Component {
  constructor(props) {
    super(props)
    console.debug("----------------APP初始化--------------")
    global.RTCPeerConnection = RTCPeerConnection
    global.navigator = { mediaDevices: { getUserMedia }, product: "ReactNative" }
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

    var device = mediasoupClient.getDeviceInfo()
    console.log("getDeviceInfo", device)

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

    console.log("在初始化RoomClient之前", roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264)
    var roomClient = new RoomClient({ roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264 })
    console.log("在初始化RoomClient之后", "roomClient", roomClient)

    // NOTE: For debugging.
    global.CLIENT = roomClient
  }
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
    return (
      <View>
        <Text>hello world</Text>
      </View>
    )
  }
}

export default App
