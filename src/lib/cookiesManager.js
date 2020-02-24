let USER_COOKIE = {};
let DEVICES_COOKIE = {};

export function getUser() 
{
	return USER_COOKIE;
}

export function setUser({ displayName }) 
{
	USER_COOKIE = { displayName };
}

export function getDevices() 
{
	return DEVICES_COOKIE;
}

export function setDevices({ webcamEnabled }) 
{
	DEVICES_COOKIE = { webcamEnabled };
}
