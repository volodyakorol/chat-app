import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const AudioFile = ({ files }: { files: TFileProps[] }) => (
  <div className={stylesheet.audios}>
    {files.map(({ filename, src }, index) => (
      <div key={index}>
        <p className={stylesheet.audios_title}>{filename}</p>
        <audio controls src={src} />
      </div>
    ))}
  </div>
);
