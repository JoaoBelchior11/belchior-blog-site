import { FC, useState } from 'react';

interface ToastProps {
  level: 'success' | 'danger';
  message: string;
}

export const Toast: FC<ToastProps> = ({ level, message }) => {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
  };
  return (
    <>
      {showToast && (
        <article className={`message is-${level}`}>
          <div className="message-header">
            <p>{level.toUpperCase()}</p>
            <button className="delete" aria-label="delete" onClick={handleClose}></button>
          </div>
          <div className="message-body">{message}</div>
        </article>
      )}
    </>
  );
};
