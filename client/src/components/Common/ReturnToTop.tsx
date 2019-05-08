import React from 'react';

const returnToTop = () => {
  if (null!== document && undefined !== document) {
    let root: HTMLElement|null = document.getElementById('root');
    null !== root && root.scrollIntoView({behavior: 'smooth', block: 'start', inline: "nearest"});
  }
};

interface ReturnToTopProps {
    isHidden?: boolean
}
export const ReturnToTop = ({
    isHidden
}: ReturnToTopProps) => (
  <div id="return-to-top" className={`transitions ${isHidden ? 'invisible' : 'visible'}`} onClick={() => returnToTop()}>
    <i className="fas fa-caret-up"/>
  </div>
);
