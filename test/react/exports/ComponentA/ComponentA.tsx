import React from "react";

interface ComponentAProps {
  text: string;
  onClick: () => void;
}

export const ComponentA = ({ text, onClick }: ComponentAProps) => {
  const className = "sample-class";

  return (
    <span className={className} onClick={onClick}>
      {text}
    </span>
  );
};
