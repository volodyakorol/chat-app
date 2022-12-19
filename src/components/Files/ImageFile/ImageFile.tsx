import { Image } from 'antd';

import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const ImageFile = ({ files }: { files: TFileProps[] }) => (
  <Image.PreviewGroup>
    <div className={stylesheet.images}>
      {files.map(({ filename, src }, index) => (
        <div key={index} className={stylesheet.image_wrapper}>
          <Image alt={filename} src={src} />
        </div>
      ))}
    </div>
  </Image.PreviewGroup>
);
