import { FC } from 'react';
import type { GenericHierarchyTableProps } from '../types';
import HierarchyRow from './HierarchyRow';

const HierarchyTable: FC<GenericHierarchyTableProps<any>> = ({ items, onDelete, excludeKeys = [] }) => {
  if (!items || items.length === 0) return <div>No data</div>;

  const firstItem = items[0];
  const displayKeys = Object.keys(firstItem).filter(
    key => !excludeKeys.includes(key) && key !== 'children'
  );
  const gridTemplate = `minmax(0, 30px) repeat(${displayKeys.length}, minmax(0, 1fr)) minmax(0, 100px)`;

  return (
    <div className="border border-slate-100 p-2 rounded">
      {displayKeys.length > 0 && (
        <div className="grid bg-black p-2 font-bold rounded border border-gray-700" style={{ gridTemplateColumns: gridTemplate }}>
          <div></div>
          {displayKeys.map((key, index) => (
            <div key={index} className="text-center overflow-hidden px-2">{key}</div>
          ))}
          <div className="text-center">Actions</div>
        </div>
      )}
      {items.map((item, index) => (
        <HierarchyRow
          key={index}
          item={item}
          onDelete={onDelete}
          excludeKeys={excludeKeys}
          displayKeys={displayKeys}
          path={[index]}
        />
      ))}
    </div>
  );
};

export default HierarchyTable;
