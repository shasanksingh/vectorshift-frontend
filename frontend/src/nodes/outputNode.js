import { useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [values, setValues] = useState({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text',
  });

  const handleFieldChange = (fieldName, fieldValue) => {
    setValues((current) => ({ ...current, [fieldName]: fieldValue }));
  };

  return (
    <BaseNode
      nodeId={id}
      title="Output"
      subtitle="Pipeline destination"
      icon="O"
      fields={[
        { name: 'outputName', label: 'Name' },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'Image', value: 'Image' },
          ],
        },
      ]}
      values={values}
      handles={[{ type: 'target', position: 'left', id: `${id}-value` }]}
      onFieldChange={handleFieldChange}
    />
  );
}
