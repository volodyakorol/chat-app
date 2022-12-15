import { AudioFile, ImageFile, TextFile, VideoFile } from '@/components/';

type PropsT = {
  files: File[];
};

export const Files = ({ files }: PropsT) => {
  return (
    <>
      {/* {files.map((file) => {
        const generalType = file.type.split('/')[0];

        switch (generalType) {
          case 'video':
            return <VideoFile files={[file]} />;
          case 'audio':
            return <AudioFile files={[file]} />;
          case 'image':
            return <ImageFile files={[file]} />;
          default:
            return <TextFile files={[file]} />;
        }
      })} */}
    </>
  );
};
