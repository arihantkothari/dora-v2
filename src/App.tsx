import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { ProcessStepsContainer } from './components/ProcessStepsContainer';
import { KnowledgeView } from './views/KnowledgeView';
import { ClientsView } from './views/ClientsView';
import { TaskProvider } from './context/TaskContext';
import { useTasks } from './hooks/useTasks';
import { ChatInterface } from './components/knowledge/ChatInterface';

type View = 'tasks' | 'knowledge' | 'clients' | 'chat';

function App() {
  const [currentView, setCurrentView] = useState<View>('tasks');
  const { tasks } = useTasks();
  const activeTasks = tasks.filter(task => task.status === 'in-progress');
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const renderView = () => {
    switch (currentView) {
      case 'knowledge':
        return <KnowledgeView onChatOpen={() => setCurrentView('chat')} />;
      case 'chat':
        return <ChatInterface onClose={() => setCurrentView('knowledge')} />;
      case 'clients':
        return <ClientsView />;
      default:
        return (
          <div className="p-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-8">
                <TaskList title="Active Tasks" tasks={activeTasks} />
                <TaskList title="Pending Tasks" tasks={pendingTasks} />
                <TaskList title="Completed Tasks" tasks={completedTasks} />
              </div>
              <div>
                <ProcessStepsContainer />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <TaskProvider>
      <div className="flex min-h-screen">
        <Sidebar 
          onViewChange={setCurrentView} 
          currentView={currentView}
          onChatToggle={() => setCurrentView(currentView === 'chat' ? 'knowledge' : 'chat')}
          isChatOpen={currentView === 'chat'}
        />
        <div className="flex-1">
          <Header />
          {renderView()}
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;