import { useContext, useMemo } from 'react'
import { PLAY_MODE, usePlayerStore } from '@/store/player'
import { PlayerContext } from '@/contexts/player'
import { playQueueStore } from '@/store/playQueue'
import { VolumeHighIcon, VolumeLowIcon, VolumeMediumIcon, VolumeMuteIcon } from '@/components/icons/icons'

export function usePlayer() {
  const player = useContext(PlayerContext)
  return {
    player,
  }
}

export function usePlayerControl() {
  const { player } = usePlayer()
  const {
    isCurrentFm,
    playing,
    track,
    loadingTrack,
    playMode,
    setPlayMode,
    shuffle,
    setShuffle,
    volume,
    showPipLyric,
    currentTime,
  } = usePlayerStore()
  const {  shuffle: doShuffle, unShuffle: doUnShuffle, queue } = playQueueStore()
  const isProgram = useMemo(() => track?.source?.fromType === 'program', [track])
  const playingIndex = useMemo(() => {
    return track ? queue.sequence.findIndex(_t => _t.id === track.id) : null
  }, [queue, track])

  const volumeIcon = useMemo(() => {
    if (volume === 0)
      return <VolumeMuteIcon fontSize='small' />
    else if (volume > 0 && volume <= 0.3)
      return <VolumeLowIcon fontSize='small' />
    else if (volume > 0.3 && volume <= 0.6)
      return <VolumeMediumIcon fontSize='small' />
    else
      return <VolumeHighIcon fontSize='small' />
  }, [volume])
  const playPrev = () => {
    player.prev()
  }
  const playNext = () => {
    if (isCurrentFm)
      player.nextFm()
    else
      player.next()
  }
  const playToggle = () => {
    player.togglePlay()
  }
  const playModeToggle = () => {
    const mode = playMode as string
    if (mode === PLAY_MODE.NORMAL)
      setPlayMode(PLAY_MODE.REPEAT)
    else if (mode === PLAY_MODE.REPEAT)
      setPlayMode(PLAY_MODE.REPEAT_ONCE)
    else if (mode === PLAY_MODE.REPEAT_ONCE)
      setPlayMode(PLAY_MODE.NORMAL)
  }

  function shuffleToggle() {
    if (shuffle) {
      doUnShuffle()
      setShuffle(false)
    }
    else {
      doShuffle()
      setShuffle(true)
    }
  }

  function togglePlayingQueue() {
    // if (isQueue.value) {
    //   router.back()
    // } else {
    //   router.push('/queue')
    // }
  }

  return {
    playPrev,
    playNext,
    playToggle,
    shuffleToggle,
    playModeToggle,
    togglePlayingQueue,
    showPipLyric,
    volume,
    volumeIcon,
    playing,
    playingIndex,
    track,
    isCurrentFm,
    isProgram,
    loadingTrack,
    playMode,
    shuffle,
    currentTime,
  }
}
