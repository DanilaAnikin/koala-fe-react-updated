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
        } else if (child.data || child.ID) {
          children.push(transformData(child));
        }
      }
    }
  }

  base.children = children;
  return base;
}

function deleteByPath(tree: DataRow[], path: number[]): DataRow[] {
  if (path.length === 0) return tree;
  const index = path[0];
  if (path.length === 1) {
    return tree.filter((_, i) => i !== index);
  } else {
    return tree.map((item, i) => {
      if (i === index) {
        return { ...item, children: deleteByPath(item.children || [], path.slice(1)) };
      }
      return item;
    });
  }
}

const Page: NextPage = () => {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    const transformedData = (rawData as any[]).map(transformData);
    setData(transformedData);
  }, []);

  const handleDelete = (path: number[]) => {
    setData(prev => deleteByPath(prev, path));
  };

  return (
    <div className="container mx-auto p-4">
      <HierarchyTable items={data} onDelete={handleDelete} excludeKeys={['children']} />
    </div>
  );
};

export default Page;
