import { useState, useRef, useEffect } from 'react'
import Sound from 'react-native-sound'

Sound.setCategory('Playback')

export interface UseAudioOptions {
  autoPlay?: boolean
  loop?: boolean
  onEnd?: () => void
}

export default (
  url,
  { autoPlay = true, onEnd, loop }: UseAudioOptions = {}
) => {
  const [ready, setReady] = useState<boolean>(false)
  const [play, setPlay] = useState<boolean>(autoPlay)
  const sound = useRef(new Sound(url, () => setReady(true)))

  useEffect(() => {
    if (!ready) return
    if (autoPlay) sound.current.play(onEnd)
    if (loop) sound.current.setNumberOfLoops(-1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useEffect(() => {
    play ? sound.current.play(onEnd) : sound.current.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play])

  return [setPlay, play, sound.current]
}
