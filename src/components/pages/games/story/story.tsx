import { useEffect, useState } from 'react'
import { getContent } from '@/i18n'
import '@/components/pages/games/story/story.css'
import { storyNodes } from '@/components/pages/games/story/story-data'

export const Story = () => {
  const [currentNode, setCurrentNode] = useState('start')
  const [history, setHistory] = useState<string[]>([])
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const [choiceIndex, setChoiceIndex] = useState(0)

  const startTyping = (text: string) => {
    setDisplayText('')
    setIsTyping(true)
    setShowChoices(false)
    setChoiceIndex(0)
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setIsTyping(false)
        setShowChoices(true)
      }
    }, 30)
    return () => clearInterval(timer)
  }

  useEffect(() => {
    const currentStory = storyNodes[currentNode as keyof typeof storyNodes]
    const text = getContent(currentStory.text)
    startTyping(text)
  }, [currentNode])

  useEffect(() => {
    if (showChoices) {
      const currentStory = storyNodes[currentNode as keyof typeof storyNodes]
      let index = 0
      const timer = setInterval(() => {
        if (index < currentStory.choices.length) {
          setChoiceIndex(index + 1)
          index++
        } else {
          clearInterval(timer)
        }
      }, 200)
      return () => clearInterval(timer)
    }
  }, [showChoices, currentNode])

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
            {displayText}
            <span className="cursor"></span>
          </div>

          <div className="story-choices">
            {currentStory.choices.map((choice, index) => (
              <button
                key={choice.text}
                type="button"
                className={`choice-btn ${index < choiceIndex ? 'visible' : ''}`}
                onClick={() => handleChoice(choice.next)}
                disabled={isTyping || index >= choiceIndex}
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
