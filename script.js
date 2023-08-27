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

  function currentSongNumber(number) {
    current_song_no.textContent = `${++number} / ${songs.length}`
  }
  function start() {
    audioPlayer.src = songs[currentSong].src
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    currentSongNumber(currentSong)
  }
  start()
  // songList modal start
  const songListModal = document.querySelector('#songListModal')
  const closeSongListModal = document.querySelector('#closeSongListModal')
  const songList = document.querySelector('#songList')

  songList.addEventListener('click', (e) => {
    currentSong = parseInt(e.target.id)
    songListModal.style.display = 'none'
    songList.innerHTML = ''
    start()
  })
  current_song_no.addEventListener('click', () => {
    songListModal.style.display = 'block'
    for (let i = 0; i < songs.length; i++) {
      songList.innerHTML += `<li id=${i}>
        ${songs[
          i
        ].caption.toUpperCase()} <h6><i class="fa-solid fa-microphone-lines"></i>${songs[
        i
      ].artist.toUpperCase()}</h6>
      </li>`
    }
  })
  closeSongListModal.addEventListener('click', () => {
    songListModal.style.display = 'none'
    songList.innerHTML = ''
  })
  // songList modal start

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
    musicPause()
    if (currentSong === songs.length - 1) {
      currentSong = -1
    }
    audioPlayer.src = songs[(currentSong += 1)].src
    currentSongNumber(currentSong)
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    if (playing) {
      audioPlayer.play()
    }
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
    musicPause()
    if (currentSong === 0) {
      currentSong = songs.length
    }
    audioPlayer.src = songs[(currentSong -= 1)].src
    currentSongNumber(currentSong)
    caption.textContent = songs[currentSong].caption.toUpperCase()
    artist_name.textContent = songs[currentSong].artist.toUpperCase()
    if (playing) {
      audioPlayer.play()
    }
  })
  // to add music with modal and form start
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
  // to add music with modal and form end
})
