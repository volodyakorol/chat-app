import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const VideoFile = ({ files }: TFileProps) => (
  <div className={stylesheet.videos}>
    {files.map(({ file, id }) => (
      <video key={id} controls>
        <source src={file} />
      </video>
    ))}
  </div>
);
