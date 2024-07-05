import React from 'react';
import { MdCheck } from 'react-icons/md';

interface ConsentItemProps {
  type?: string;
  onClick: () => void;
  checked: boolean;
  label: string;
}
function ConsentItem({ type, onClick, checked, label }: ConsentItemProps) {
  const buttonBaseClasses =
    'w-10 h-10 flex justify-center items-center text-2xl font-bold';

  // borderClasses는 type이 'all'일 때만 추가
  const borderClasses = type === 'all' ? 'border-2 rounded-lg' : '';

  // backgroundClasses는 type이 'all'일 때와 아닐 때의 상태에 따라 설정
  let backgroundClasses;
  if (type === 'all') {
    backgroundClasses = checked ? 'bg-scienceblue text-concrete' : 'text-alto';
  } else {
    backgroundClasses = checked ? 'text-scienceblue' : 'text-alto';
  }
  return (
    <article className="flex justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onClick}
          className={`${buttonBaseClasses} ${borderClasses} ${backgroundClasses}`}
        >
          {' '}
          <MdCheck />
        </button>
        <span className={`${type === 'all' ? 'text-2xl font-bold' : ''}`}>
          {label}
        </span>
      </div>
      {type !== 'all' && (
        <button type="button" className="text-scienceblue">
          보기
        </button>
      )}
    </article>
  );
}

export default ConsentItem;
