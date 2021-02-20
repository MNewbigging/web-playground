import React from 'react';

export const BLInfoPopover: React.FC = () => {
  return (
    <div style={{ padding: '10px' }}>
      <h3>blether</h3>
      <p>About: a basic web messenger app, have a blether with your friends!</p>
      <p>Mostly just a proof of concept for serverless peer-to-peer connections.</p>
      <p>Definitely some bugs; when exiting chat you'll need to refresh to use it again.</p>
      <p>What I learned:</p>
      <ul>
        <li>Peerjs; this project was a means to learn how peerjs works</li>
        <li>Better responsive styling; entirely different components for mobile</li>
        <li>Data model for host/client; you can either host or join so needed to allow for this</li>
      </ul>
    </div>
  );
};
