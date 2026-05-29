import { PipelineSidebar, PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="app-shell">
      <div className="chatbot-backdrop" aria-hidden="true">
        <div className="chatbot-glass">
          <div className="chatbot-head">
            <span />
            <span />
          </div>
          <div className="chatbot-message chatbot-message-one" />
          <div className="chatbot-message chatbot-message-two" />
          <div className="chatbot-message chatbot-message-three" />
        </div>
      </div>
      <PipelineToolbar />
      <div className="workspace-shell">
        <PipelineSidebar />
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
