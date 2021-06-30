import React, { useState, useRef, useEffect } from 'react';
import { useHMSActions } from '@100mslive/hms-video-react';
import getToken from '../getToken';

const Join = () => {
  const room_id = `60dc108f6592758b50bab559`;
  const hmsActions = useHMSActions();
  const [userName, setUserName] = useState('Nikhil');
  const [room, setRoom] = useState(room_id);
  const [joinAudio, setJoinAudio] = useState(true);
  const [joinVideo, setJoinVideo] = useState(true);
  const joinRoom = () => {
    getToken(room_id)
      .then((token) => {
        console.log({
          token,
          userName,
        });
        hmsActions.join({
          authToken: token,
          userName,
          settings: {
            isAudioMuted: !joinAudio,
            isVideoMuted: !joinVideo,
          },
        });
      })
      .catch((error) => {
        console.log('Token API Error', error);
      });
  };
  const videoRef = useRef(null);
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia && joinVideo) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          videoRef.current.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log('Something went wrong!');
        });
    }
  }, [joinVideo]);
  return (
    <div className='mt-10'>
      <h1 className='text-3xl font-bold text-gray-200'>Join Section</h1>
      <div className='mt-4'>
        <div className='my-4'>
          <label htmlFor='username-input' className='text-gray-400'>
            Username
          </label>
          <input
            type='text'
            id='username-input'
            className='mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-800 text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            placeholder='Your name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label htmlFor='token-input' className='text-gray-400'>
            Room ID
          </label>
          <textarea
            type='text'
            id='token-input'
            className='mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-800 text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            placeholder='Room ID'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        {joinVideo ? (
          <div className='my-4'>
            <video
              ref={videoRef}
              autoPlay={true}
              playsInline
              muted={true}
              className='w-64 h-64 rounded-md object-cover inline'
              style={{ transform: 'scaleX(-1)' }}
            ></video>
          </div>
        ) : null}
        <div className='my-4'>
          <input
            type='checkbox'
            id='join-audio'
            name='audio'
            value={joinAudio}
            onChange={(e) => setJoinAudio(e.target.checked)}
            className='mr-2'
            defaultChecked={joinAudio}
          />
          <label for='join-audio'>Join with Audio On</label>
        </div>
        <div className='my-4'>
          <input
            type='checkbox'
            id='join-video'
            name='Video'
            value={joinVideo}
            defaultChecked={joinVideo}
            onChange={(e) => setJoinVideo(e.target.checked)}
            className='mr-2'
          />
          <label for='join-video'>Join with Video On</label>
        </div>
        <button
          type='button'
          className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'
          onClick={() => joinRoom()}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Join;