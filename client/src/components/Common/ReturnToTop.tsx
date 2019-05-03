import React from 'react';

const returnToTop = () => {
  if (null!== document && undefined !== document) {
    let root: HTMLElement|null = document.getElementById('root');
    null !== root && root.scrollIntoView({behavior: 'smooth', block: 'start', inline: "nearest"});
  }
};

export const ReturnToTop: React.FunctionComponent = () => (
  <div id="return-to-top" onClick={() => returnToTop()}>
    <i className="fas fa-caret-up"/>
  </div>
);
