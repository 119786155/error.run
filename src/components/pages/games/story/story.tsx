import { useEffect, useRef, useState } from 'react'
import { getContent } from '@/i18n'
import '@/components/pages/games/story/story.css'

export const Story = () => {
  const [currentNode, setCurrentNode] = useState('start')
  const [history, setHistory] = useState<string[]>([])

  // 故事节点数据结构
  const storyNodes = {
    start: {
      text: 'story.nodes.start.text',
      choices: [
        { text: 'story.nodes.start.choice1', next: 'forest' },
        { text: 'story.nodes.start.choice2', next: 'village' },
      ],
    },
    forest: {
      text: 'story.nodes.forest.text',
      choices: [
        { text: 'story.nodes.forest.choice1', next: 'start' },
        { text: 'story.nodes.forest.choice2', next: 'cave' },
      ],
    },
    village: {
      text: 'story.nodes.village.text',
      choices: [
        { text: 'story.nodes.village.choice1', next: 'start' },
        { text: 'story.nodes.village.choice2', next: 'tavern' },
      ],
    },
    cave: {
      text: 'story.nodes.cave.text',
      choices: [
        { text: 'story.nodes.cave.choice1', next: 'forest' },
        { text: 'story.nodes.cave.choice2', next: 'treasure' },
      ],
    },
    tavern: {
      text: 'story.nodes.tavern.text',
      choices: [
        { text: 'story.nodes.tavern.choice1', next: 'village' },
        { text: 'story.nodes.tavern.choice2', next: 'quest' },
      ],
    },
    treasure: {
      text: 'story.nodes.treasure.text',
      choices: [
        { text: 'story.nodes.treasure.choice1', next: 'start' },
      ],
    },
    quest: {
      text: 'story.nodes.quest.text',
      choices: [
        { text: 'story.nodes.quest.choice1', next: 'start' },
      ],
    },
  }

  const handleChoice = (nextNode: string) => {
    setHistory([...history, currentNode])
    setCurrentNode(nextNode)
  }

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1]
      setHistory(history.slice(0, -1))
      setCurrentNode(previousNode)
    }
  }

  const handleRestart = () => {
    setCurrentNode('start')
    setHistory([])
  }

  const currentStory = storyNodes[currentNode as keyof typeof storyNodes]

  return (
    <div className="story-wrapper">
      <div className="story-container">
        <div className="story-header">
          <h1>{getContent('story.title')}</h1>
          <p className="subtitle">{getContent('story.subtitle')}</p>
        </div>

        <div className="story-content">
          <div className="story-text">
            {getContent(currentStory.text)}
          </div>

          <div className="story-choices">
            {currentStory.choices.map((choice, index) => (
              <button
                key={index}
                type="button"
                className="choice-btn"
                onClick={() => handleChoice(choice.next)}
              >
                {getContent(choice.text)}
              </button>
            ))}
          </div>
        </div>

        <div className="story-controls">
          {history.length > 0 && (
            <button type="button" className="control-btn" onClick={handleBack}>
              {getContent('story.btn.back')}
            </button>
          )}
          <button type="button" className="control-btn" onClick={handleRestart}>
            {getContent('story.btn.restart')}
          </button>
        </div>

        <div className="story-progress">
          {getContent('story.progress')}: {history.length + 1}
        </div>
      </div>
    </div>
  )
}
