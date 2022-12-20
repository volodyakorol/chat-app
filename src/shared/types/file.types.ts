export type TFileType = 'image' | 'video' | 'audio' | 'application';

export type TFile = {
  key: number;
  fileType: TFileType;
  originalname: string;
};

export type TFileProps = {
  filename: string;
  src: string;
};
