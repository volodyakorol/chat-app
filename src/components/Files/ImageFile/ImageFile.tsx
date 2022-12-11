import { Image } from 'antd';

import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const ImageFile = ({ files }: TFileProps) => (
  <Image.PreviewGroup>
    <div className={stylesheet.images}>
      {files.map(({ file, id, name }) => (
        <div key={id} className={stylesheet.image_wrapper}>
          <Image alt={name} src={file} />
        </div>
      ))}
    </div>
  </Image.PreviewGroup>
);
