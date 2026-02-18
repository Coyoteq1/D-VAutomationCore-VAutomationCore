
import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { LogEntry } from '../types';
import { Terminal, Trash2, Play, Pause } from 'lucide-react';

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('connect', () => setIsConnected(true));
    socketRef.current.on('disconnect', () => setIsConnected(false));

    socketRef.current.on('log-line', (log: LogEntry) => {
      if (!isPaused) {
        setLogs((prev) => [...prev.slice(-499), log]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isPaused]);

  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  const clearLogs = () => setLogs([]);

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-emerald-400" />
          <h2 className="font-semibold">Live Server Logs</h2>
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button 
            onClick={clearLogs}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title="Clear Logs"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 scrollbar-thin scrollbar-thumb-slate-700"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 hover:bg-slate-800/50 rounded px-1 group">
            <span className="text-slate-500 select-none whitespace-nowrap">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className="text-slate-300 break-all">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate-500 italic">Waiting for logs...</div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
