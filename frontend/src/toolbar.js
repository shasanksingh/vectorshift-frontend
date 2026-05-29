// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeDefinitions';
import { SubmitButton } from './submit';

const componentNodes = toolbarNodes.filter((node) => !['filter', 'note'].includes(node.type));
const subComponentNodes = toolbarNodes.filter((node) => ['filter', 'note'].includes(node.type));

export const PipelineToolbar = () => {

    return (
        <header className="pipeline-toolbar">
            <div className="brand-lockup">
                <div>
                    <p className="eyebrow">VectorShift</p>
                    <h1>Pipeline Builder</h1>
                </div>
            </div>
            <SubmitButton />
        </header>
    );
};

export const PipelineSidebar = () => {
    return (
        <aside className="pipeline-sidebar">
            <div className="sidebar-title">
                <span className="sidebar-title-icon" aria-hidden="true">+</span>
                <span>Tools</span>
            </div>

            <p className="sidebar-section-label">Components</p>
            <div className="sidebar-node-list">
                {componentNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>

            <p className="sidebar-section-label">Sub Components</p>
            <div className="sidebar-node-list">
                {subComponentNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </aside>
    );
};
