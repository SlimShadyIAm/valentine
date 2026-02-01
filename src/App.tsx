import { useState, useRef } from 'react'
import './App.css'
import audio1 from './assets/audio/1.mp3'
import audio2 from './assets/audio/2.mp3'
import audio3 from './assets/audio/3.mp3'
import valentineImage from './assets/Valentine_s_Day_Mobile.webp'

function App() {
  const [scale, setScale] = useState(100);
  const [textScale, setTextScale] = useState(100);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [spacerSize, setSpacerSize] = useState<{ width: number; height: number } | null>(null);
  const [showYippieCat, setShowYippieCat] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAudioIndexRef = useRef<number | null>(null);
  const audioFiles = [audio1, audio2, audio3];

  const playRandomAudio = () => {
    // Filter out the last played audio
    const availableAudios = audioFiles.filter((_, index) => index !== lastAudioIndexRef.current);

    // Select random audio from available ones
    const randomIndex = Math.floor(Math.random() * availableAudios.length);
    const randomAudio = availableAudios[randomIndex];

    // Find the original index to track it
    const originalIndex = audioFiles.indexOf(randomAudio);
    lastAudioIndexRef.current = originalIndex;

    const audio = new Audio(randomAudio);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  const onHover = () => {
    playRandomAudio();
    decreaeseScale()
    jumpToRandomPosition()

  }

  const decreaeseScale = () => {
    setScale(scale * 0.85)
    setTextScale(prev => prev * 2)
  }

  const jumpToRandomPosition = () => {
    if (!buttonRef.current || !containerRef.current) return;

    // Store button dimensions before moving (only on first jump)
    if (!spacerSize && buttonRef.current) {
      setSpacerSize({
        width: buttonRef.current.offsetWidth,
        height: buttonRef.current.offsetHeight
      });
    }

    const containerRect = containerRef.current.getBoundingClientRect();

    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Calculate position relative to the container
    setPosition({
      x: randomX - containerRect.left,
      y: randomY - containerRect.top
    });
  }

  const handleYesClick = () => {
    setShowYippieCat(true);
  }

  return (
    <div
      className='flex items-center flex-col  justify-center w-screen h-screen'
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-vector/flat-design-wildflower-heart-background_23-2150534247.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {showYippieCat ? (
        <>
          <img src="https://media1.tenor.com/m/RiZpodi6JD0AAAAd/fast-cat-cat-excited.gif">
          </img>
          <p className='comic-sans'>see you then &lt;333</p>
          <p className='comic-sans'>I CANT WAIT</p>
        </>
      ) : (
        <>
          <h1 className="comic-sans">HIIIIIIII</h1>
          <img src={valentineImage} alt="Valentine's Day" className="max-w-md mb-4" />
          <h2 className='comic-sans'>ich mag dich</h2>
          <h2 className='comic-sans'>willst du meine sein</h2>
          <h2 className={`comic-sans absolute z-50 top-4 ${textScale === 100 ? 'hidden' : ''}`} style={{ transform: `scale(${textScale / 100})`, pointerEvents: 'none' }}>please</h2>
          <div ref={containerRef} className='flex flex-row gap-4 mt-4 items-center relative'>
            <div>
              <button className="rainbow-button comic-sans" onClick={handleYesClick}>JA!!!!</button>
            </div>
            {position && spacerSize && <div style={{ width: spacerSize.width, height: spacerSize.height }} />}
            <div
              ref={buttonRef}
              style={{
                position: position ? 'absolute' : 'static',
                left: position ? `${position.x}px` : 'auto',
                top: position ? `${position.y}px` : 'auto',
                transform: `scale(${scale / 100})`,
              }}
              onMouseOver={onHover}
            >
              <button className='z-99'>nein :(</button>
            </div>
          </div>
        </>
      )}

    </div >
  )
}

export default App
