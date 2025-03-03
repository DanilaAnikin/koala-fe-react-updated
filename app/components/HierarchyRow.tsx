import { useState } from 'react';
import type { HierarchyRowProps } from '../types';

function renderCell(value: any) {
  if (value === null || value === 'NULL') return '';
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  return value;
}

const HierarchyRow = <T extends { [key: string]: any }>({
  item,
  onDelete,
  excludeKeys = [],
  displayKeys,
  path = []
}: HierarchyRowProps<T> & { path?: number[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const computedDisplayKeys =
    displayKeys && displayKeys.length > 0
      ? displayKeys
      : Object.keys(item).filter(key => key !== 'children' && !excludeKeys.includes(key));

  const hasNested = Array.isArray(item.children) && item.children.length > 0;

  const toggleExpand = () => {
    if (hasNested) setIsExpanded(!isExpanded);
  };

  const gridTemplate = `minmax(0, 30px) repeat(${computedDisplayKeys.length}, minmax(0, 1fr)) minmax(0, 100px)`;

  return (
    <div className="my-2 rounded border border-gray-700 shadow-sm">
      <div
        className={`grid bg-gray-900 p-2 items-center ${hasNested ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ gridTemplateColumns: gridTemplate }}
        onClick={toggleExpand}
      >
        <div className="text-center">{hasNested ? (isExpanded ? '▼' : '▶') : ''}</div>
        {computedDisplayKeys.map((key, i) => (
          <div key={i} className="font-bold text-center overflow-hidden px-2">
            {renderCell(item[key])}
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(path);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-400"
          >
            Delete
          </button>
        </div>
      </div>
      {isExpanded && hasNested && (
        <div className="ml-4">
          {item.children.map((child: any, idx: number) => (
            <HierarchyRow
              key={idx}
              item={child}
              onDelete={onDelete}
              excludeKeys={excludeKeys}
              displayKeys={[]}
              path={[...path, idx]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HierarchyRow;
