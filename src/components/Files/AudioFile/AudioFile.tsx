import { TFileProps } from '@/shared/types/file.types';

import styles from './styles.module.scss';

export const AudioFile = ({ files }: { files: TFileProps[] }) => (
  <div className={styles.audios}>
    {files.map(({ filename, src }) => (
      <div key={src}>
        <p className={styles.audios_title}>{filename}</p>
        <audio controls src={src} />
      </div>
    ))}
  </div>
);
