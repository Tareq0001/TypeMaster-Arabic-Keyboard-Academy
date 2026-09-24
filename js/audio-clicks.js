/**
 * TypeMaster Academy | Real-Time Mechanical Switch Sound Synthesizer
 * ==================================================================
 * Synthesizes tactile mechanical keyboard clicks (Cherry MX style),
 * error thuds, and victory chimes in pure Web Audio API without audio files.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

class SoundEffectsEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isInitialized = false;
    this.soundpack = 'cherry'; // 'cherry', 'typewriter', 'chiclet', 'bubble', 'mute'
    this.metronomeBpm = 0; // 0 = off, 60, 90, 120, 180
    this.metronomeInterval = null;
    this.onMetronomeTick = null;
    this.metronomeBeatCount = 0;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    this.isInitialized = true;
  }

  ensureContext() {
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundpack(pack) {
    this.soundpack = pack;
    if (pack === 'mute') {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }
    return this.soundpack;
  }

  playKeyClick(char = '') {
    if (this.isMuted || this.soundpack === 'mute') return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    switch (this.soundpack) {
      case 'typewriter': {
        // Classic mechanical punch + transient clink
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(320 + Math.random() * 80, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.05);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

        // Filter to give that metallic vintage typewriter enclosure body
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, t);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.06);

        // Carriage bell chime when pressing Space
        if (char === ' ') {
          const bellOsc = this.ctx.createOscillator();
          const bellGain = this.ctx.createGain();
          bellOsc.type = 'sine';
          bellOsc.frequency.setValueAtTime(1760, t + 0.01); // A6 bell
          bellGain.gain.setValueAtTime(0.08, t + 0.01);
          bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          bellOsc.connect(bellGain);
          bellGain.connect(this.ctx.destination);
          bellOsc.start(t + 0.01);
          bellOsc.stop(t + 0.2);
        }
        break;
      }

      case 'chiclet': {
        // Soft, cushioned modern Apple Magic keyboard membrane thud
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260 + Math.random() * 40, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.025);

        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.035);
        break;
      }

      case 'bubble': {
        // Resonant ascending water bubble pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const startFreq = 420 + Math.random() * 80;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 2.1, t + 0.05);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.065);
        break;
      }

      case 'cherry':
      default: {
        // Classic Cherry MX Blue: crisp high snap followed by tactile bottoming
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const freq = 620 + Math.random() * 180;
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.03);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.04);
        break;
      }
    }
  }

  playErrorSound() {
    if (this.isMuted || this.soundpack === 'mute') return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.linearRampToValueAtTime(90, t + 0.12);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  playSuddenDeathFail() {
    if (this.isMuted || this.soundpack === 'mute') return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Dramatic two-tone buzzer & glass shatter thud
    [180, 110, 70].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);
      gain.gain.setValueAtTime(0.3, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 0.26);
    });
  }

  playFinishChime() {
    if (this.isMuted || this.soundpack === 'mute') return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + idx * 0.07);

      gain.gain.setValueAtTime(0.22, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.5);
    });
  }

  // ==========================================================
  // METRONOME CADENCE PACER (Audio beat for finger rhythm)
  // ==========================================================
  setMetronome(bpm, onTick = null) {
    this.metronomeBpm = bpm;
    this.onMetronomeTick = onTick;

    if (this.metronomeInterval) {
      clearInterval(this.metronomeInterval);
      this.metronomeInterval = null;
    }

    if (bpm <= 0) return;

    this.ensureContext();
    const intervalMs = (60 / bpm) * 1000;
    this.metronomeBeatCount = 0;

    this.metronomeInterval = setInterval(() => {
      this.metronomeBeatCount++;
      const isAccent = (this.metronomeBeatCount % 4 === 1);
      this.playMetronomeTick(isAccent);
      if (this.onMetronomeTick) {
        this.onMetronomeTick(this.metronomeBeatCount, isAccent);
      }
    }, intervalMs);
  }

  playMetronomeTick(isAccent = false) {
    if (this.isMuted || this.soundpack === 'mute') return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.025);

    gain.gain.setValueAtTime(isAccent ? 0.25 : 0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.metronomeInterval) {
        clearInterval(this.metronomeInterval);
        this.metronomeInterval = null;
      }
    }
    return this.isMuted;
  }
}
