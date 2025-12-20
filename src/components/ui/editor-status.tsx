import { YjsPlugin } from '@platejs/yjs/react'
import { usePluginOption } from 'platejs/react'

export const EditorStatus = () => {
  // Access provider states directly (read-only)
  const providers = usePluginOption(YjsPlugin, '_providers')
  const isConnected = usePluginOption(YjsPlugin, '_isConnected')

  return (
    <div>
      {providers.map((provider) => (
        <span key={provider.type}>
          {provider.type}: {isConnected ? 'Connected' : 'Disconnected'} ({provider.isSynced ? 'Synced' : 'Syncing'})
        </span>
      ))}
    </div>
  )
}

// Add event handlers for connection events:
YjsPlugin.configure({
  options: {
    // ... other options
    onConnect: ({ type }) => console.debug(`Provider ${type} connected!`),
    onDisconnect: ({ type }) => console.debug(`Provider ${type} disconnected.`),
    onSyncChange: ({ type, isSynced }) => console.debug(`Provider ${type} sync status: ${isSynced}`),
    onError: ({ type, error }) => console.error(`Error in provider ${type}:`, error),
  },
})
