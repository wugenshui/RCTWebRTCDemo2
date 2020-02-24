export function getProtooUrl(peerName, roomId, forceH264)
{
	// let hostname = window.location.hostname;
	const hostname = 'v2demo.mediasoup.org';

	// peerName = '5zqchj7d';
	// roomId = 'p1ufkrlg';
	let url = `wss://${hostname}:3443/?peerName=${peerName}&roomId=${roomId}`;

	if (forceH264)
		url = `${url}&forceH264=true`;

	return url;
}
