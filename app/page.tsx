"use client";

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import HierarchyTable from './components/HierarchyTable';
import type { DataRow } from './types';
import rawData from './example-data.json';

function transformData(item: any): DataRow {
  const base: DataRow = item.data ? { ...item.data } : { ...item };

  let children: DataRow[] = [];
  
  if (item.children && typeof item.children === 'object' && Object.keys(item.children).length > 0) {  
    for (const key in item.children) {
      const child = item.children[key];
      
      if (child && typeof child === 'object') {

        if (Array.isArray(child.records)) {
          children = children.concat(child.records.map(transformData));
        } else if (child.data) {
          children.push(transformData(child));
        } else if (child.ID) {
          children.push(transformDirectChild(child));
        }
      }
    }
  }

  base.children = filterDuplicates(children);

  return base;
}

function transformDirectChild(child: any): DataRow {
  const newChild: DataRow = { ...child };
  if (child.children && typeof child.children === 'object' && Object.keys(child.children).length > 0) {
    let childArray: DataRow[] = [];
    
    for (const key in child.children) {
      const innerChild = child.children[key];
    
      if (innerChild && typeof innerChild === 'object') {
        
        if (Array.isArray(innerChild.records)) {
          childArray = childArray.concat(innerChild.records.map(transformData));
        } else if (innerChild.data) {
          childArray.push(transformData(innerChild));
        } else if (innerChild.ID) {
          childArray.push(transformDirectChild(innerChild));
        }
      }
    }

    newChild.children = filterDuplicates(childArray);
  } else {
    newChild.children = [];
  }

  return newChild;
}

function filterDuplicates(items: DataRow[]): DataRow[] {
  const map = new Map<string, DataRow>();

  items.forEach(item => {
    if (!map.has(item.ID)) {
      map.set(item.ID, { ...item, children: filterDuplicates(item.children || []) });
    } else {
      const existing = map.get(item.ID)!;
      const mergedChildren = filterDuplicates([...(existing.children || []), ...(item.children || [])]);
      
      map.set(item.ID, { ...existing, children: mergedChildren });
    }
  });

  return Array.from(map.values());
}

const deleteRecursive = (list: DataRow[], targetId: string): DataRow[] =>
  list.reduce((acc: DataRow[], item: DataRow) => {
    if (item.ID === targetId) {
      return acc;
    }
    const newItem = { ...item };
    if (newItem.children && Array.isArray(newItem.children)) {
      newItem.children = deleteRecursive(newItem.children, targetId);
    }
    acc.push(newItem);
    return acc;
  }, []);

const Page: NextPage = () => {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    const transformedData = (rawData as any[]).map(transformData);

    setData(filterDuplicates(transformedData));
  }, []);

  const handleDelete = (item: DataRow) => {
    setData(prev => deleteRecursive(prev, item.ID));
  };

  return (
    <div className="container mx-auto p-4">
      <HierarchyTable
        items={data}
        onDelete={handleDelete}
        excludeKeys={['children']}
      />
    </div>
  );
};

export default Page;
