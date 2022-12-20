import { Input as AntdInput, InputProps } from 'antd';

import styles from './styles.module.scss';

type TInputProps = InputProps;

export const Input = (props: TInputProps) => {
  return <AntdInput className={styles.input} {...props} />;
};
