document.addEventListener('DOMContentLoaded', function () {
  const songs = [
    {
      caption: 'brazil',
      src: './song/Declan_McKenna_-_Brazil.mp3',
      artist: 'declan mckenna',
    },
    {
      caption: 'perfect',
      src: './song/perfect-ed-sheeran.mp3',
      artist: 'ed sheeran',
    },
    {
      caption: 'sign of the times',
      src: './song/sign-of-the-times-harry-styles.mp3',
      artist: 'harry styles',
    },
    {
      caption: 'radio',
      src: './song/radio-lana-del-rey.mp3',
      artist: 'lana del rey',
    },
    {
      caption: 'save your tears',
      src: './song/The_Weeknd_Save_Your_Tears.mp3',
      artist: 'the weeknd',
    },
  ]
  let currentSong = 0
  let playing = false

  const audioPlayer = document.querySelector('#audio-player')
  const status = document.querySelector('.status')
  const musicIcon = document.querySelector('#music-icon')
  const next_song = document.querySelector('#next_song')
  const prev_song = document.querySelector('#prev_song')
  const artist_name = document.querySelector('.artist_name')
  const caption = document.querySelector('.caption')
  const current_song_no = document.querySelector('.current_song_no')
  const volume_of_song = document.querySelector('#volume_of_song')
  const time_left_of_song = document.querySelector('#time_left_of_song')
  const volume_of_song_percentage = document.querySelector(
    '#volume_of_song_percentage'
  )
  const volume_icon = document.querySelector('#volume_icon')

  function currentSongNumber(number) {
    current_song_no.textContent = `${++number} / ${songs.length}`
  }
  function start() {
    audioPlayer.volume = 0.5
    audioPlayer.src = songs[currentSong].src
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    currentSongNumber(currentSong)
    volume_of_song_percentage.textContent = volume_of_song.value + ' %'
    time_left_of_song.value = 0
  }
  start()

  musicIcon.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play()
    } else {
      audioPlayer.pause()
    }
  })

  // manipulate volume and time of song
  volume_of_song.addEventListener('input', () => {
    audioPlayer.volume = volume_of_song.value / 100
    volume_of_song_percentage.textContent = volume_of_song.value + ' %'
    if (parseInt(volume_of_song.value) === 0) {
      volume_icon.setAttribute('class', '')
      volume_icon.classList.add('fa-solid', 'fa-volume-xmark')
    } else if (parseInt(volume_of_song.value) < 50) {
      volume_icon.setAttribute('class', '')
      volume_icon.classList.add('fa-solid', 'fa-volume-low')
    } else {
      volume_icon.setAttribute('class', '')
      volume_icon.classList.add('fa-solid', 'fa-volume-high')
    }
  })
  time_left_of_song.addEventListener('input', () => {
    const percentage = time_left_of_song.value
    const duration = audioPlayer.duration
    const seekTime = (percentage / 100) * duration
    audioPlayer.currentTime = seekTime
  })
  audioPlayer.addEventListener('timeupdate', () => {
    if (playing) {
      const currentTime = audioPlayer.currentTime
      const duration = audioPlayer.duration
      const percentage = (currentTime / duration) * 100
      time_left_of_song.value = percentage
    }
  })

  // manipulate what to do when play or pause or end
  function musicPlay() {
    status.style.opacity = '1'
    musicIcon.style.animation = 'spin 4s linear infinite'
    status.textContent = 'heart on beats'
  }
  function musicPause() {
    musicIcon.style.animation = ''
    status.textContent = 'Frozen Heart !'
    status.style.opacity = '0.4'
  }

  audioPlayer.addEventListener('play', () => {
    musicPlay()
    playing = true
  })
  audioPlayer.addEventListener('pause', () => {
    musicPause()
    playing = false
  })
  audioPlayer.addEventListener('ended', function () {
    if (currentSong === songs.length - 1) {
      currentSong = -1
    }
    audioPlayer.src = songs[(currentSong += 1)].src
    currentSongNumber(currentSong)
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    audioPlayer.play()
  })

  // manipulate when next or prev icon got action
  next_song.addEventListener('mouseover', () => {
    if (currentSong === songs.length - 1) {
      return (caption.textContent = `... ${songs[0].caption}`)
    }
    caption.textContent = `... ${songs[currentSong + 1].caption}`
  })
  next_song.addEventListener('mouseout', () => {
    caption.textContent = songs[currentSong].caption.toUpperCase()
  })
  next_song.addEventListener('click', () => {
    musicIcon.style.animation = ''

    if (currentSong === songs.length - 1) {
      currentSong = -1
    }
    audioPlayer.src = songs[(currentSong += 1)].src
    currentSongNumber(currentSong)
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    if (playing) {
      audioPlayer.play()
      return
    }
    musicPause()
  })

  prev_song.addEventListener('mouseover', () => {
    if (currentSong === 0) {
      return (caption.textContent = `${songs[songs.length - 1].caption} ...`)
    }
    caption.textContent = `${songs[currentSong - 1].caption} ...`
  })
  prev_song.addEventListener('mouseout', () => {
    caption.textContent = songs[currentSong].caption.toUpperCase()
  })
  prev_song.addEventListener('click', () => {
    musicIcon.style.animation = ''

    if (currentSong === 0) {
      currentSong = songs.length
    }
    audioPlayer.src = songs[(currentSong -= 1)].src
    currentSongNumber(currentSong)
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    if (playing) {
      audioPlayer.play()
      return
    }
    musicPause()
  })
  // to add music with modal start
  const addSongModal = document.querySelector('#addSongModal')
  const openAddSongModalBtn = document.querySelector('#openAddSongModalBtn')
  const closeAddSongModalBtn = document.querySelector('#closeAddSongModal')

  openAddSongModalBtn.onclick = function () {
    addSongModal.style.display = 'block'
  }
  closeAddSongModalBtn.onclick = function () {
    addSongModal.style.display = 'none'
  }

  const addMusicForm = document.querySelector('#addMusicForm')

  addMusicForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const formCaption = document.querySelector('#caption').value
    const formArtist = document.querySelector('#artist').value
    const formAudioFile = document.querySelector('#audioFile').files[0]

    songs.push({
      caption: formCaption,
      src: URL.createObjectURL(formAudioFile),
      artist: formArtist,
    })

    addMusicForm.reset()
    addSongModal.style.display = 'none'
    currentSong = songs.length - 1
    start()
  })
  // to add music with modal end
  // songList modal start
  const songListModal = document.querySelector('#songListModal')
  const closeSongListModal = document.querySelector('#closeSongListModal')
  const songList = document.querySelector('#songList')

  songList.addEventListener('click', (e) => {
    let clickedElement = e.target

    while (clickedElement && clickedElement.tagName !== 'LI') {
      clickedElement = clickedElement.parentElement
    }

    if (clickedElement) {
      currentSong = parseInt(clickedElement.id)
      songListModal.style.display = 'none'
      songList.innerHTML = ''
      start()
      if (playing) {
        audioPlayer.play()
      }
    }
  })

  current_song_no.addEventListener('click', () => {
    songListModal.style.display = 'block'

    function createSong(i) {
      const listItem = document.createElement('li')
      listItem.id = i

      const captionElement = document.createElement('span')
      captionElement.textContent = songs[i].caption.toUpperCase()
      listItem.appendChild(captionElement)

      const artistElement = document.createElement('h6')
      const microphoneIcon = document.createElement('i')
      microphoneIcon.className = 'fa-solid fa-microphone-lines'
      artistElement.appendChild(microphoneIcon)
      artistElement.innerHTML += songs[i].artist.toUpperCase()
      listItem.appendChild(artistElement)
      return listItem
    }

    for (let i = 0; i < songs.length; i++) {
      const song = createSong(i)
      songList.appendChild(song)
    }
  })

  closeSongListModal.addEventListener('click', () => {
    songListModal.style.display = 'none'
    songList.innerHTML = ''
  })
  // songList modal end
})
