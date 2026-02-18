
import React from 'react';
import LogViewer from './components/LogViewer';
import TaskManager from './components/TaskManager';
import { Activity } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-6 lg:p-8">
      <header className="max-w-7xl mx-auto mb-8 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
          <Activity className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">V-AUTOMATION DASHBOARD</h1>
          <p className="text-slate-500 text-sm font-medium">Live Server Monitoring & Task Management</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-160px)]">
        <section className="h-full min-h-[400px]">
          <LogViewer />
        </section>
        <section className="h-full min-h-[400px]">
          <TaskManager />
        </section>
      </main>
    </div>
  );
}

export default App;
