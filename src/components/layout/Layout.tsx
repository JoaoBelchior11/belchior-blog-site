import { FC } from 'react';
import { Header } from '../header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div role="presentation">
      <Header title="A Blog site" />
      <div className={styles.layout}>{children}</div>
    </div>
  );
};
