
import React, { useState, useEffect } from 'react';
import { Task, Priority, TaskCategory } from '../types';
import { Plus, Trash2, CheckCircle, Circle, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Other');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    const saved = localStorage.getItem('v-logs-tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('v-logs-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description: '',
      category,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-emerald-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
      <div className="p-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Task Management</h2>
        <form onSubmit={addTask} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option>Bugs</option>
              <option>Features</option>
              <option>Maintenance</option>
              <option>Other</option>
            </select>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
            <button 
              type="submit"
              className="ml-auto bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm group transition-all ${task.completed ? 'opacity-60' : ''}`}
          >
            <button onClick={() => toggleTask(task.id)} className="text-slate-400 hover:text-blue-500 transition-colors">
              {task.completed ? <CheckCircle className="text-emerald-500" size={20} /> : <Circle size={20} />}
            </button>
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                {task.title}
              </h3>
              <div className="flex gap-3 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <AlertCircle size={12} className={getPriorityColor(task.priority)} />
                  {task.priority.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {task.dueDate}
                </span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded uppercase font-semibold text-[10px]">
                  {task.category}
                </span>
              </div>
            </div>
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p>No tasks yet. Start by adding one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
