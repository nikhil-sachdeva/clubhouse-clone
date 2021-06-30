import React from 'react';
import {
  useHMSActions,
  selectPeers,
  selectIsSomeoneScreenSharing,
  selectPeerScreenSharing,
  useHMSStore,
  selectIsLocalScreenShared,
} from '@100mslive/hms-video-react';

const Room = () => {
  const peers = useHMSStore(selectPeers);
  const IsSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const IsLocalScreenShared = useHMSStore(selectIsLocalScreenShared);
  console.log('Someone Sharing :: ' + IsSomeoneScreenSharing);
  const screenSharePeer = useHMSStore(selectPeerScreenSharing);
  const hmsActions = useHMSActions();
  const stopScreenShare = () => {
    hmsActions.setScreenShareEnabled(false);
  };
  return (
    <div className='mt-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-gray-200'>Room</h1>
      {/* <div className='flex flex-wrap pb-10 justify-center mt-10'>
        {IsSomeoneScreenSharing ? (
          <>
            {IsLocalScreenShared ? (
              <div className='pt-56 flex flex-col items-center'>
                <p className='font-bold text-4xl'>You're Sharing Screen</p>
                <button
                  onClick={() => stopScreenShare()}
                  className='mt-10 p-2 rounded bg-red-500'
                >
                  Stop Sharing
                </button>
              </div>
            ) : (
              <ScreenShareTile peer={screenSharePeer} />
            )}{' '}
          </>
        ) : (
          peers &&
          peers.length > 0 &&
          peers.map((peer) => <VideoTile key={peer.id} peer={peer} />)
        )}
      </div> */}
      <div className='fixed bottom-10 '>
        {/* <Controls /> */}
      </div>
    </div>
  );
};

export default Room;