// draggableNode.js

const toolIcons = {
  customInput: (
    <>
      <path d="M4 12h10" />
      <path d="M10 8l4 4-4 4" />
      <path d="M17 5h3v14h-3" />
    </>
  ),
  llm: (
    <>
      <rect x="5" y="7" width="14" height="11" rx="3" />
      <path d="M12 7V4" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M9 15h6" />
    </>
  ),
  customOutput: (
    <>
      <path d="M10 5H6v14h4" />
      <path d="M10 12h10" />
      <path d="M16 8l4 4-4 4" />
    </>
  ),
  text: (
    <>
      <path d="M5 6h14" />
      <path d="M9 6v12" />
      <path d="M15 6v12" />
      <path d="M7 18h4" />
      <path d="M13 18h4" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),
  transform: (
    <>
      <path d="M7 7h7a4 4 0 0 1 0 8H6" />
      <path d="M9 11l-3 4 3 4" />
      <path d="M15 5l3 3-3 3" />
    </>
  ),
  apiRequest: (
    <>
      <path d="M7 8l-4 4 4 4" />
      <path d="M17 8l4 4-4 4" />
      <path d="M14 5l-4 14" />
    </>
  ),
  condition: (
    <>
      <path d="M12 4l8 8-8 8-8-8 8-8z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </>
  ),
  note: (
    <>
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M14 4v4h4" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </>
  ),
};

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className="draggable-node-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              {toolIcons[type] || toolIcons.note}
            </svg>
          </span>
          <span>{label}</span>
      </div>
    );
  };
  
