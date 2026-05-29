import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      nodeId={id}
      title="LLM"
      subtitle="Generate a response"
      icon="L"
      handles={[
        { type: 'target', position: 'left', id: `${id}-system`, style: { top: `${100 / 3}%` } },
        { type: 'target', position: 'left', id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
        { type: 'source', position: 'right', id: `${id}-response` },
      ]}
    />
  );
}
