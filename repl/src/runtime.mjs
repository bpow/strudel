// this file contains a runtime scope for testing all the tunes
// it mocks all the functions that won't work in node (who are not important for testing values / structure)
// it might require mocking more stuff when tunes added that use other functions

// import * as tunes from './tunes.mjs';
import { evaluate } from '@strudel.cycles/eval';
import { evalScope } from '@strudel.cycles/eval';
import * as strudel from '@strudel.cycles/core';
import * as webaudio from '@strudel.cycles/webaudio';
import controls from '@strudel.cycles/core/controls.mjs';
// import gist from '@strudel.cycles/core/gist.js';
import { mini } from '@strudel.cycles/mini/mini.mjs';
// import { Tone } from '@strudel.cycles/tone';
// import * as toneHelpers from '@strudel.cycles/tone/tone.mjs';
// import * as voicingHelpers from '@strudel.cycles/tonal/voicings.mjs';
// import * as uiHelpers from '@strudel.cycles/tone/ui.mjs';
// import * as drawHelpers from '@strudel.cycles/tone/draw.mjs';
// import euclid from '@strudel.cycles/core/euclid.mjs';
// import '@strudel.cycles/tone/tone.mjs';
// import '@strudel.cycles/midi/midi.mjs';
import '@strudel.cycles/tonal/voicings.mjs';
import '@strudel.cycles/tonal/tonal.mjs';
import '@strudel.cycles/xen/xen.mjs';
// import '@strudel.cycles/xen/tune.mjs';
// import '@strudel.cycles/core/euclid.mjs';
// import '@strudel.cycles/core/speak.mjs'; // window is not defined
// import '@strudel.cycles/tone/pianoroll.mjs';
// import '@strudel.cycles/tone/draw.mjs';
// import '@strudel.cycles/osc/osc.mjs';
// import '@strudel.cycles/webaudio/webaudio.mjs';
// import '@strudel.cycles/serial/serial.mjs';
// import controls from '@strudel.cycles/core/controls.mjs';

import { prebake } from './prebake.mjs';

class MockedNode {
  chain() {
    return this;
  }
  connect() {
    return this;
  }
  toDestination() {
    return this;
  }
  set() {
    return this;
  }
  start() {
    return this;
  }
}

const mockNode = () => new MockedNode();

const id = (x) => x;

const toneHelpersMocked = {
  FeedbackDelay: MockedNode,
  MembraneSynth: MockedNode,
  NoiseSynth: MockedNode,
  MetalSynth: MockedNode,
  Synth: MockedNode,
  PolySynth: MockedNode,
  Chorus: MockedNode,
  Freeverb: MockedNode,
  Gain: MockedNode,
  vol: mockNode,
  out: id,
  osc: id,
  adsr: id,
  getDestination: id,
  players: mockNode,
  sampler: mockNode,
  synth: mockNode,
  piano: mockNode,
  polysynth: mockNode,
  fmsynth: mockNode,
  membrane: mockNode,
  noise: mockNode,
  metal: mockNode,
  lowpass: mockNode,
  highpass: mockNode,
};

// tone mock
strudel.Pattern.prototype.tone = function () {
  return this;
};
strudel.Pattern.prototype.webdirt = function () {
  return this;
};

// draw mock
strudel.Pattern.prototype.pianoroll = function () {
  return this;
};

// speak mock
strudel.Pattern.prototype.speak = function () {
  return this;
};

// webaudio mock
strudel.Pattern.prototype.wave = function () {
  return this;
};
strudel.Pattern.prototype.filter = function () {
  return this;
};
strudel.Pattern.prototype.adsr = function () {
  return this;
};
strudel.Pattern.prototype.out = function () {
  return this;
};
// tune mock
strudel.Pattern.prototype.tune = function () {
  return this;
};

const uiHelpersMocked = {
  backgroundImage: id,
};

prebake(true);

// TODO: refactor to evalScope
evalScope(
  // Tone,
  strudel,
  strudel.Pattern.prototype.bootstrap(),
  toneHelpersMocked,
  uiHelpersMocked,
  controls,
  webaudio,
  /* controls,
  toneHelpers,
  voicingHelpers,
  drawHelpers,
  uiHelpers,
  */
  {
    // gist,
    // euclid,
    mini,
    // Tone,
  },
);

export const queryCode = async (code, cycles = 1) => {
  const { pattern } = await evaluate(code);
  const haps = pattern.queryArc(0, cycles);
  return haps.map((h) => h.showWhole());
};

export const testCycles = {
  timeCatMini: 16,
  timeCat: 8,
  shapeShifted: 16,
  tetrisMini: 16,
  whirlyStrudel: 16,
  swimming: 51,
  giantSteps: 20,
  giantStepsReggae: 25,
  transposedChordsHacked: 8,
  scaleTranspose: 16,
  struct: 4,
  magicSofa: 8,
  confusedPhone: 8,
  zeldasRescue: 48,
  technoDrums: 4,
  caverave: 60,
  callcenterhero: 22,
  primalEnemy: 4,
  synthDrums: 4,
  sampleDrums: 4,
  xylophoneCalling: 60,
  sowhatelse: 60,
  barryHarris: 64,
  wavyKalimba: 64,
  jemblung: 12,
  risingEnemy: 12,
  festivalOfFingers: 16,
  festivalOfFingers2: 22,
  undergroundPlumber: 20,
  bridgeIsOver: 16,
  goodTimes: 16,
  echoPiano: 8,
  sml1: 48,
  speakerman: 48,
  randomBells: 24,
  waa: 16,
  waar: 16,
  hyperpop: 10,
  festivalOfFingers3: 16,
};
