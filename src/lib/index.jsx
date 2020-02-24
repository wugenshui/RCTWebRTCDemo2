import React from 'react';
import { render } from 'react-dom';
import {
	applyMiddleware as applyReduxMiddleware,
	createStore as createReduxStore
} from 'redux';
import RoomClient from './RoomClient';
import { getDeviceInfo } from 'mediasoup-client';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';

const reduxMiddlewares = [ thunk ];

const store = createReduxStore(
	reducers,
	undefined,
	applyReduxMiddleware(...reduxMiddlewares)
);

RoomClient.init({ store });

const peerName = "mypeername"+Math.random();
const roomId = 'myroomid';
const displayName = 'chenbo';
const useSimulcast = true;
const forceTcp = false;
const spy = false;
const forceH264 = false;

// Get current device.
const device = getDeviceInfo();

console.log(roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264)
var roomClient = new RoomClient({ roomId, peerName, displayName, device, useSimulcast, forceTcp, spy, forceH264 });

render(
	<div>
	</div>,
	document.getElementById('mediasoup-demo-app-container')
);

