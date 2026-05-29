import { useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [values, setValues] = useState({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
  });

  const handleFieldChange = (fieldName, fieldValue) => {
    setValues((current) => ({ ...current, [fieldName]: fieldValue }));
  };

  return (
    <BaseNode
      nodeId={id}
      title="Input"
      subtitle="Pipeline source"
      icon="I"
      fields={[
        { name: 'inputName', label: 'Name' },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'File', value: 'File' },
          ],
        },
      ]}
      values={values}
      handles={[
        { type: 'target', position: 'left', id: `${id}-feedback`, style: { top: '68%' } },
        { type: 'source', position: 'right', id: `${id}-value` },
      ]}
      onFieldChange={handleFieldChange}
    />
  );
}
