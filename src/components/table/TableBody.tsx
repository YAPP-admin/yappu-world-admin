import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const TableBody: FC<Props> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
