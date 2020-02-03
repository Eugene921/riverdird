import * as React from 'react';

export default function DataList(props) {
  const { listItem, id } = props;
  const elemListItem = listItem.map(item => {
    return <option 
      key={item.key || item.value}
      value={item.value}
    />
  })

  return (
    <datalist
      id={id}
    >
      { elemListItem }
    </datalist>
  );
}