
import {
  HMSRoomProvider,
  useHMSStore,
  selectIsConnectedToRoom,
} from '@100mslive/hms-video-react';
import Join from './components/Join';
import Room from './components/Room';
import './index.css';

const Conference = () => {
  // is the peer connected
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  console.log(`Connected to Room :: ${isConnected}`);
  return <>{isConnected ? <Room /> : <Join />}</>;
};

export default function App() {
  return (
    <div className='w-full min-h-screen flex items-center flex-col bg-gray-900 text-white'>
      <HMSRoomProvider>
        <Conference />
      </HMSRoomProvider>
    </div>
  );
}