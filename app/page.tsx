import Map from './components/map';
import Chat from './components/chat';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Map />
      <Chat />
    </div>
  );
}
