import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const AudioFile = ({ files }: TFileProps) => (
  <div className={stylesheet.audios}>
    {files.map(({ file, id, name }) => (
      <div key={id}>
        <p className={stylesheet.audios_title}>{name}</p>
        <audio controls src={file} />
      </div>
    ))}
  </div>
);
