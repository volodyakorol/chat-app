import { AudioFile, ImageFile, TextFile, VideoFile } from '@/components/';

type TFilesProps = {
  files: {
    src: string;
    filename: string;
    mimetype: string;
  }[];
};

export const Files = ({ files }: TFilesProps) => {
  const images = files.filter(({ mimetype }) => mimetype.startsWith('image'));
  const videos = files.filter(({ mimetype }) => mimetype.startsWith('video'));
  const audios = files.filter(({ mimetype }) => mimetype.startsWith('audio'));
  const docs = files
    .filter(({ mimetype }) => mimetype.startsWith('application'))
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
