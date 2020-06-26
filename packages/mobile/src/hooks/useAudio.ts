import { useState, useRef, useEffect } from 'react'
import Sound from 'react-native-sound'

Sound.setCategory('Playback')

export interface UseAudioOptions {
  autoPlay?: boolean
  loop?: boolean
}

export default (url, { autoPlay = true, loop }: UseAudioOptions = {}) => {
  const [ready, setReady] = useState<boolean>(false)
  const sound = useRef(new Sound(url, () => setReady(true)))

  useEffect(() => {
    if (!ready) return
    if (autoPlay) sound.current.play()
    if (loop) sound.current.setNumberOfLoops(-1)
  }, [ready, loop, autoPlay])

  return sound
}
