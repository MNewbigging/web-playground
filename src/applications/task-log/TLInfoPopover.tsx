import React from 'react';

export const TLInfoPopover: React.FC = () => {
  return (
    <div style={{ padding: '10px' }}>
      <h3>Task Log</h3>
      <p>About: Simple web app for tracking personal tasks with a sci-fi theme.</p>
      <p>Tasks are saved between sessions, set task priority, tracked and completed.</p>
      <p>What I learned:</p>
      <ul>
        <li>
          CSS grid should use minmax(0, fr) since auto is default min size, messes up overflow
        </li>
        <li>CSS opacity is additive, so parent of .5 and child of 1 means child is .5</li>
        <li>
          Indexeddb to store items; had to do a task store, with listeners to update state on
          various CRUD operations
        </li>
        <li>Handmade dialog popups</li>
        <li>Better grip on css pseudo elements</li>
      </ul>
    </div>
  );
};
