let songs = []
let currentSong
let fading = false
let fadeStartAt
let volume

function preload() {
  roboto = loadFont('assets/fonts/RobotoMono.ttf')

  soundFormats('mp3', 'wav', 'ogg')

  songs = [
    loadSound('assets/sounds/heartbeats.m4a'),
    // loadSound('assets/sounds/im-on-fire.m4a'),
    loadSound('assets/sounds/fade-into-you.m4a'),
    loadSound('assets/sounds/kiss-me.m4a'),
  ]
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  background(255)

  textAlign(CENTER)
  textFont(roboto)
  textSize(24)
  text('A to Play, S to Fade Out', width / 2, height / 2)
}

function draw() {
  if (fading && volume == 0) {
    currentSong.stop()
    fading = false
  }

  if (fading && volume > 0) {
    const elapsedSecs = (millis() - fadeStartAt) / 1000 / 5
    volume = Math.max(lerp(1.0, 0, elapsedSecs), 0)
    currentSong.setVolume(volume)
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume()
  }
}

function keyPressed() {
  console.log(key, 'is pressed')
  console.log(keyCode, 'is pressed')

  switch (key) {
    case 'A':
      if (currentSong) {
        currentSong.stop()
      }
      currentSong = songs[Math.floor(Math.random() * songs.length)]
      playOnce(currentSong)
      fading = false
      break
    case 'S':
      fading = true
      volume = 1.0
      fadeStartAt = millis()
      break
  }
}

function playOnce(soundFile) {
  if (soundFile.isPlaying()) {
    return
  }
  soundFile.setVolume(1)
  soundFile.play()
}
