import React from 'react';
import './NoticeList.less';

export default function NoticeList({
  data = [], onClick, title, locale, emptyText, emptyImage,
}) {
  if (data.length === 0) {
    return (
      <div className='notFound'>
        {emptyImage ? (
          <img src={emptyImage} alt="not found" />
        ) : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <div className='list'>
        {data.map((item, i) => <div key={i} className='item' onClick={() => onClick(item)}>
          <div className="title">{item.title}</div>
          <div className="description">{item.description}</div>
          <div className="datetime">{item.datetime}</div>
          <div className="extra">{item.extra}</div>
        </div>)}
      </div>
    </div>
  );
}
