import { memo, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const nodeIconPaths = {
  Input: (
    <>
      <path d="M4 12h11" />
      <path d="M11 8l4 4-4 4" />
      <path d="M17 5h3v14h-3" />
    </>
  ),
  LLM: (
    <>
      <rect x="5" y="7" width="14" height="11" rx="3" />
      <path d="M12 7V4" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M9 15h6" />
    </>
  ),
  Output: (
    <>
      <path d="M9 5H5v14h4" />
      <path d="M9 12h11" />
      <path d="M16 8l4 4-4 4" />
    </>
  ),
  Text: (
    <>
      <path d="M5 6h14" />
      <path d="M9 6v12" />
      <path d="M15 6v12" />
      <path d="M7 18h4" />
      <path d="M13 18h4" />
    </>
  ),
  Filter: (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),
  Transform: (
    <>
      <path d="M7 7h7a4 4 0 0 1 0 8H6" />
      <path d="M9 11l-3 4 3 4" />
      <path d="M15 5l3 3-3 3" />
    </>
  ),
  'API Request': (
    <>
      <path d="M7 8l-4 4 4 4" />
      <path d="M17 8l4 4-4 4" />
      <path d="M14 5l-4 14" />
    </>
  ),
  Condition: (
    <>
      <path d="M12 4l8 8-8 8-8-8 8-8z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </>
  ),
  Note: (
    <>
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M14 4v4h4" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </>
  ),
};

const NodeIcon = ({ title, fallback }) => (
  <svg className="node-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
    {nodeIconPaths[title] || nodeIconPaths[fallback] || nodeIconPaths.Note}
  </svg>
);

const renderField = ({ field, value, onChange }) => {
  const commonProps = {
    id: field.name,
    value,
    onChange: (event) => onChange(field.name, event.target.value),
  };

  if (field.type === 'select') {
    return (
      <select {...commonProps} className="node-field-control">
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        {...commonProps}
        className="node-field-control node-textarea"
        rows={field.rows || 3}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <input
      {...commonProps}
      className="node-field-control"
      type={field.type || 'text'}
      placeholder={field.placeholder}
    />
  );
};

export const BaseNode = memo(({
  nodeId,
  title,
  subtitle,
  icon,
  fields = [],
  values = {},
  handles = [],
  dynamicHandles = [],
  width,
  height,
  onFieldChange = () => {},
}) => {
  const allHandles = useMemo(() => [...handles, ...dynamicHandles], [handles, dynamicHandles]);
  const deleteNode = useStore((state) => state.deleteNode);
  const deleteHandleConnections = useStore((state) => state.deleteHandleConnections);

  const handleRemoveNode = (event) => {
    event.stopPropagation();
    deleteNode(nodeId);
  };

  const handleRemoveConnections = (event, handleId) => {
    event.stopPropagation();
    deleteHandleConnections(nodeId, handleId);
  };

  return (
    <div className="pipeline-node" style={{ width, minHeight: height }}>
      {allHandles.map((handle, index) => (
        <Handle
          key={`${handle.id}-${index}`}
          type={handle.type}
          position={positionMap[handle.position]}
          id={handle.id}
          className="pipeline-handle"
          style={handle.style}
          onClick={(event) => handleRemoveConnections(event, handle.id)}
          title="Remove connections from this port"
        />
      ))}

      <div className="node-header">
        <span className="node-icon">
          <NodeIcon title={title} fallback={icon} />
        </span>
        <div>
          <div className="node-title">{title}</div>
          {subtitle && <div className="node-subtitle">{subtitle}</div>}
        </div>
        <button className="node-remove" type="button" onClick={handleRemoveNode} aria-label={`Remove ${title} node`}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8" />
            <path d="M12 4l-8 8" />
          </svg>
        </button>
      </div>

      {fields.length > 0 && (
        <div className="node-fields">
          {fields.map((field) => (
            <label className="node-field" key={field.name}>
              <span>{field.label}</span>
              {renderField({
                field,
                value: values[field.name] ?? '',
                onChange: onFieldChange,
              })}
            </label>
          ))}
        </div>
      )}
    </div>
  );
});
