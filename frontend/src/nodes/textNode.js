import { useEffect, useMemo, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';

const variablePattern = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const names = new Set();
  let match = variablePattern.exec(text);

  while (match) {
    names.add(match[1]);
    match = variablePattern.exec(text);
  }

  return [...names];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(currText), [currText]);
  const width = Math.min(420, Math.max(240, currText.length * 4 + 220));
  const height = Math.min(360, Math.max(140, Math.ceil(currText.length / 38) * 32 + 112));

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variables]);

  const handleFieldChange = (fieldName, fieldValue) => {
    if (fieldName === 'text') {
      setCurrText(fieldValue);
    }
  };

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      subtitle="Template variables become inputs"
      icon="T"
      fields={[
        { name: 'text', label: 'Text', type: 'textarea', rows: 4, placeholder: 'Write {{input}} into a prompt...' },
      ]}
      values={{ text: currText }}
      handles={[{ type: 'source', position: 'right', id: `${id}-output` }]}
      dynamicHandles={variables.map((name, index) => ({
        type: 'target',
        position: 'left',
        id: `${id}-${name}`,
        style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` },
      }))}
      width={width}
      height={height}
      onFieldChange={handleFieldChange}
    />
  );
}
