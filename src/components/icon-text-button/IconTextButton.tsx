import { FC } from 'react';

interface IconTextButtonProps {
  text: number | string;
  icon: JSX.Element;
}

export const IconTextButton: FC<IconTextButtonProps> = ({ text, icon }) => {
  return (
    <div>
      <span className="icon-text">
        <span className="icon">{icon}</span>
        <span>{text}</span>
      </span>
    </div>
  );
};
