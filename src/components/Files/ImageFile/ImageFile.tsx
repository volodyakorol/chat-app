import { Image } from 'antd';

import { TFileProps } from '@/shared/types/file.types';

import styles from './styles.module.scss';

export const ImageFile = ({ files }: { files: TFileProps[] }) => (
  <Image.PreviewGroup>
    <div className={styles.images}>
      {files.map(({ filename, src }) => (
        <div key={src} className={styles.image_wrapper}>
          <Image alt={filename} src={src} />
        </div>
      ))}
    </div>
  </Image.PreviewGroup>
);
