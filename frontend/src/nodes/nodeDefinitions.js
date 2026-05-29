import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { createConfiguredNode } from './standardNode';

const selectOptions = (...values) => values.map((value) => ({ label: value, value }));

export const nodeDefinitions = {
  customInput: {
    label: 'Input',
    component: InputNode,
  },
  llm: {
    label: 'LLM',
    component: LLMNode,
  },
  customOutput: {
    label: 'Output',
    component: OutputNode,
  },
  text: {
    label: 'Text',
    component: TextNode,
  },
  filter: {
    label: 'Filter',
    component: createConfiguredNode({
      title: 'Filter',
      subtitle: 'Keep matching records',
      icon: 'F',
      defaults: { condition: 'status === "active"', mode: 'Strict' },
      fields: [
        { name: 'condition', label: 'Condition', placeholder: 'score > 0.8' },
        { name: 'mode', label: 'Mode', type: 'select', options: selectOptions('Strict', 'Loose') },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'matches' },
        { type: 'source', position: 'right', id: 'rejected', style: { top: '72%' } },
      ],
    }),
  },
  transform: {
    label: 'Transform',
    component: createConfiguredNode({
      title: 'Transform',
      subtitle: 'Map data into a new shape',
      icon: 'T',
      defaults: { mapper: 'item => item.value', outputName: 'mapped_items' },
      fields: [
        { name: 'mapper', label: 'Mapper', placeholder: 'item => item.name' },
        { name: 'outputName', label: 'Output' },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'items' },
        { type: 'source', position: 'right', id: 'result' },
      ],
    }),
  },
  apiRequest: {
    label: 'API',
    component: createConfiguredNode({
      title: 'API Request',
      subtitle: 'Call an HTTP endpoint',
      icon: 'A',
      defaults: { method: 'GET', url: 'https://api.example.com/data' },
      fields: [
        { name: 'method', label: 'Method', type: 'select', options: selectOptions('GET', 'POST', 'PUT', 'PATCH') },
        { name: 'url', label: 'URL', placeholder: 'https://...' },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'body' },
        { type: 'source', position: 'right', id: 'response' },
      ],
    }),
  },
  condition: {
    label: 'Condition',
    component: createConfiguredNode({
      title: 'Condition',
      subtitle: 'Branch the pipeline',
      icon: 'C',
      defaults: { expression: 'confidence >= 0.9' },
      fields: [
        { name: 'expression', label: 'Expression', placeholder: 'value === true' },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'true', style: { top: '40%' } },
        { type: 'source', position: 'right', id: 'false', style: { top: '72%' } },
      ],
    }),
  },
  note: {
    label: 'Note',
    component: createConfiguredNode({
      title: 'Note',
      subtitle: 'Annotate your graph',
      icon: 'N',
      defaults: { note: 'Describe this section...' },
      fields: [
        { name: 'note', label: 'Note', type: 'textarea', rows: 4 },
      ],
      handles: [],
      width: 240,
    }),
  },
};

export const nodeTypes = Object.fromEntries(
  Object.entries(nodeDefinitions).map(([type, definition]) => [type, definition.component])
);

export const toolbarNodes = Object.entries(nodeDefinitions).map(([type, definition]) => ({
  type,
  label: definition.label,
}));
