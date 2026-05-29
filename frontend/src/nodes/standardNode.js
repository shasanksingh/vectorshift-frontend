import { useState } from 'react';
import { BaseNode } from './baseNode';

const getHandleId = (nodeId, handleId) => `${nodeId}-${handleId}`;

export const createConfiguredNode = (config) => {
  return function ConfiguredNode({ id, data }) {
    const [values, setValues] = useState({ ...config.defaults, ...data });

    const handleFieldChange = (fieldName, fieldValue) => {
      setValues((current) => ({ ...current, [fieldName]: fieldValue }));
    };

    return (
      <BaseNode
        nodeId={id}
        title={config.title}
        subtitle={config.subtitle}
        icon={config.icon}
        fields={config.fields}
        values={values}
        handles={(config.handles || []).map((handle) => ({
          ...handle,
          id: getHandleId(id, handle.id),
        }))}
        width={config.width}
        height={config.height}
        onFieldChange={handleFieldChange}
      />
    );
  };
};
