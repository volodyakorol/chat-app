import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const VideoFile = ({ files }: { files: TFileProps[] }) => (
  <div className={stylesheet.videos}>
    {files.map(({ src }) => (
      <video key={src} controls>
        <source src={src} />
      </video>
    ))}
  </div>
);
