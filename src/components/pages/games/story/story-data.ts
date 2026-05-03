export type StoryChoice = {
  text: string
  next: string
}

export type StoryNode = {
  text: string
  choices: StoryChoice[]
}

export type StoryNodes = Record<string, StoryNode>

export const storyNodes: StoryNodes = {
  start: {
    text: 'story.start',
    choices: [
      { text: 'story.choice.linYe', next: 'linYe_intro' },
      { text: 'story.choice.suWan', next: 'suWan_intro' },
    ],
  },
  linYe_intro: {
    text: 'story.linYe_intro',
    choices: [
      { text: 'story.choice.stayObserve', next: 'linYe_A' },
      { text: 'story.choice.goForward', next: 'linYe_B' },
    ],
  },
  linYe_A: {
    text: 'story.linYe_A',
    choices: [
      { text: 'story.choice.takeCopper', next: 'linYe_A1' },
      { text: 'story.choice.giveUpCopper', next: 'linYe_A2' },
    ],
  },
  linYe_A1: {
    text: 'story.linYe_A1',
    choices: [],
  },
  linYe_A2: {
    text: 'story.linYe_A2',
    choices: [],
  },
  linYe_B: {
    text: 'story.linYe_B',
    choices: [
      { text: 'story.choice.healFirst', next: 'linYe_B1' },
      { text: 'story.choice.ignoreWound', next: 'linYe_B2' },
    ],
  },
  linYe_B1: {
    text: 'story.linYe_B1',
    choices: [],
  },
  linYe_B2: {
    text: 'story.linYe_B2',
    choices: [],
  },
  suWan_intro: {
    text: 'story.suWan_intro',
    choices: [
      { text: 'story.choice.helpNow', next: 'suWan_C' },
      { text: 'story.choice.observeFirst', next: 'suWan_D' },
    ],
  },
  suWan_C: {
    text: 'story.suWan_C',
    choices: [
      { text: 'story.choice.goTogether', next: 'suWan_C1' },
      { text: 'story.choice.goAlone', next: 'suWan_C2' },
    ],
  },
  suWan_C1: {
    text: 'story.suWan_C1',
    choices: [],
  },
  suWan_C2: {
    text: 'story.suWan_C2',
    choices: [],
  },
  suWan_D: {
    text: 'story.suWan_D',
    choices: [
      { text: 'story.choice.sneakAway', next: 'suWan_D1' },
      { text: 'story.choice.stopThem', next: 'suWan_D2' },
    ],
  },
  suWan_D1: {
    text: 'story.suWan_D1',
    choices: [],
  },
  suWan_D2: {
    text: 'story.suWan_D2',
    choices: [],
  },
  end: {
    text: 'story.end',
    choices: [{ text: 'story.choice.restart', next: 'start' }],
  },
}
