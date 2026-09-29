/**
 * Moteur sonore immersif d'automne (Front-End pur, zéro dépendance réseau)
 * Génère en temps réel le crépitement d'un feu de bois et le souffle du vent léger
 * via la Web Audio API native, sans aucun fichier externe lourd.
 */

class AutumnSoundEngine {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.masterGain = null
    this.windGain = null
    this.fireGain = null
    this.windFilter = null
    this.windLfo = null
    this.crackleTimer = null
  }

  init() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    this.ctx = new AudioContextClass()

    // Gain principal
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)

    this.setupWind()
    this.setupFireRumble()
  }

  setupWind() {
    if (!this.ctx) return
    // Buffer de bruit rose pour le vent
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04
      b6 = white * 0.115926
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    // Filtre passe-bande modulant le souffle du vent
    this.windFilter = this.ctx.createBiquadFilter()
    this.windFilter.type = 'bandpass'
    this.windFilter.frequency.setValueAtTime(260, this.ctx.currentTime)
    this.windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime)

    // LFO pour faire osciller doucement la hauteur du vent
    this.windLfo = this.ctx.createOscillator()
    this.windLfo.frequency.setValueAtTime(0.18, this.ctx.currentTime) // Oscillation lente
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(90, this.ctx.currentTime)
    this.windLfo.connect(lfoGain)
    lfoGain.connect(this.windFilter.frequency)

    this.windGain = this.ctx.createGain()
    this.windGain.gain.setValueAtTime(0.45, this.ctx.currentTime)

    whiteNoise.connect(this.windFilter)
    this.windFilter.connect(this.windGain)
    this.windGain.connect(this.masterGain)

    whiteNoise.start()
    this.windLfo.start()
  }

  setupFireRumble() {
    if (!this.ctx) return
    // Grésillement sourd des braises
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let lastOut = 0.0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      output[i] = (lastOut + (0.02 * white)) / 1.02
      lastOut = output[i]
      output[i] *= 0.15
    }

    const rumble = this.ctx.createBufferSource()
    rumble.buffer = noiseBuffer
    rumble.loop = true

    const rumbleFilter = this.ctx.createBiquadFilter()
    rumbleFilter.type = 'lowpass'
    rumbleFilter.frequency.setValueAtTime(160, this.ctx.currentTime)

    this.fireGain = this.ctx.createGain()
    this.fireGain.gain.setValueAtTime(0.35, this.ctx.currentTime)

    rumble.connect(rumbleFilter)
    rumbleFilter.connect(this.fireGain)
    this.fireGain.connect(this.masterGain)

    rumble.start()
  }

  triggerCrackle() {
    if (!this.isPlaying || !this.ctx) return

    // Crépitement aléatoire de brindille
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    const freq = 1200 + Math.random() * 2400
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

    const now = this.ctx.currentTime
    const duration = 0.02 + Math.random() * 0.03
    gain.gain.setValueAtTime(0.08 + Math.random() * 0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(gain)
    gain.connect(this.masterGain)

    osc.start(now)
    osc.stop(now + duration)

    // Planification du prochain crépitement
    const nextInterval = 250 + Math.random() * 700
    this.crackleTimer = setTimeout(() => this.triggerCrackle(), nextInterval)
  }

  start() {
    this.init()
    if (!this.ctx) return

    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    this.isPlaying = true
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0.7, now + 1.5) // Fondu d entrée doux

    this.triggerCrackle()
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return
    this.isPlaying = false

    if (this.crackleTimer) {
      clearTimeout(this.crackleTimer)
      this.crackleTimer = null
    }

    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8) // Fondu de sortie doux
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
    } else {
      this.start()
    }
    return this.isPlaying
  }
}

export const autumnSound = new AutumnSoundEngine()
