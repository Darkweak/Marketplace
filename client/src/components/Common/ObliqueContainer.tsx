import * as React from 'react';

interface TextDividerProps {
    reverse?: boolean
}
const TextDivider: React.FunctionComponent<TextDividerProps> = ({reverse}) => (
  <div className={`text-divider ${reverse && 'reverse-text-divider'}`}/>
);
TextDivider.defaultProps = {
    reverse: false
};

interface TextContainerProps {
    children: any,
    container?: boolean,
    divider?: boolean,
    secondary?: boolean
}
export const TextContainer: React.FunctionComponent<TextContainerProps> = ({
   children,
   container,
   divider,
   secondary
}) => (
  <React.Fragment>
    <div className={`py-5 ${secondary && 'table-active'}`}>
      <div className={`container`}>
        { children }
      </div>
    </div>
    { divider && <TextDivider reverse={secondary} /> }
  </React.Fragment>
);
TextContainer.defaultProps = {
    container: false,
    divider: false,
    secondary: false
};
