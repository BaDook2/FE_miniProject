import React from 'react';

interface itemRow {
  children: React.ReactNode;
  label: string;
}
function ItemRow({ children, label }: itemRow) {
  return (
    <div className="w-full flex gap-2">
      <div className="flex-none w-20 border-r-2 pr-2 text-sm text-alto">
        {label}
      </div>
      {children}
    </div>
  );
}

export default ItemRow;
