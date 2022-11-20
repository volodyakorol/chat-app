import { Input as AntdInput, InputProps } from 'antd';

import s from './styles.module.scss';

type TInputProps = InputProps;

export const Input = (props: TInputProps) => {
  return <AntdInput className={s.input} {...props} />;
};
