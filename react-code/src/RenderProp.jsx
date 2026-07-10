// https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering
// Render props is a technique in which a component receives a function as a prop and calls it to render its output.
// It is useful when we want to pass some data to the child component and also want to control how that data is rendered in the child component.

import React, { useState } from 'react';

function TabSwitcher({ tabIds, getHeader, renderContent }) {
  const [selectedId, setSelectedId] = useState(tabIds[0]);
  return (
    <>
      {tabIds.map((tabId) => (
        <button
          key={tabId}
          onClick={() => setSelectedId(tabId)}
        >
          {getHeader(tabId)}
        </button>
      ))}
      <hr />
      <div key={selectedId}>
        <h3>{getHeader(selectedId)}</h3>
        {renderContent(selectedId)}
      </div>
    </>
  );
}

export default function RenderProp() {
  return (
    <TabSwitcher
      tabIds={['first', 'second', 'third']}
      getHeader={tabId => {
        return tabId.toUpperCase();
      }}
      renderContent={tabId => {
        return <p>This is the {tabId} item.</p>;
      }}
    />
  );
}


