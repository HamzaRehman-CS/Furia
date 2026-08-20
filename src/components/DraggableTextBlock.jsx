import React from 'react';

export default function DraggableTextBlock({
  id,
  as = 'div',
  defaultText = '',
  style = {},
  className = '',
  children,
  multiline,
  ...props
}) {
  const Component = as;
  const content = children !== undefined ? children : defaultText;

  if (typeof content === 'string' && content.includes('\n')) {
    return (
      <Component className={className} style={style} {...props}>
        {content.split('\n').map((line, idx, arr) => (
          <React.Fragment key={idx}>
            {line}
            {idx < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className} style={style} {...props}>
      {content}
    </Component>
  );
}
