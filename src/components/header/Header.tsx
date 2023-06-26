import { FC } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className="title is-1">{title}</h1>
    </header>
  );
};
