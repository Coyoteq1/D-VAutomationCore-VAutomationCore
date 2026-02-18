
# Project Knowledge Base

## Infrastructure & Configuration
- **Live Logs Application**: Located in `/log-viewer-app`.
  - **Backend**: Node.js/TypeScript Express server using `socket.io` and `tail` to stream logs from `D:\DedicatedServerLauncher\VRisingServer\BepInEx\LogOutput.log`.
  - **Frontend**: Vite/React/TypeScript dashboard with Tailwind CSS.
  - **Ports**: Backend runs on 3001, Frontend usually on 5173 (Vite default).

## Conventions
- **Log Streaming**: Backend watches for file changes and emits `log-line` events via WebSockets.
- **Persistence**: Task management uses `localStorage` for client-side persistence.
- **UI Components**: Use Lucide-React for icons and Tailwind CSS for styling.

## Key Files
- `log-viewer-app/backend/server.ts`: Entry point for log streaming server.
- `log-viewer-app/frontend/src/components/LogViewer.tsx`: WebSocket client for log display.
- `log-viewer-app/frontend/src/components/TaskManager.tsx`: Task CRUD with local storage.
