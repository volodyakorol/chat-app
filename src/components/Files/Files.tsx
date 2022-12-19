import { AudioFile, ImageFile, TextFile, VideoFile } from '@/components/';

type PropsT = {
  files: {
    src: string;
    filename: string;
    mimetype: string;
  }[];
};

export const Files = ({ files }: PropsT) => {
  const images = files.filter(({ mimetype }) => mimetype.split('/').at(0) === 'image');
  const videos = files.filter(({ mimetype }) => mimetype.split('/').at(0) === 'video');
  const audios = files.filter(({ mimetype }) => mimetype.split('/').at(0) === 'audio');
  const docs = files
    .filter(({ mimetype }) => mimetype.split('/').at(0) === 'application')
    .map((doc) => ({ ...doc, filetype: doc.filename.split('.').at(-1) ?? '' }));

  return (
    <>
      <ImageFile files={images} />
      <AudioFile files={audios} />
      <VideoFile files={videos} />
      <TextFile files={docs} />
    </>
  );
};
