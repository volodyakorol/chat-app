export type TFileType = 'image' | 'video' | 'audio' | 'doc' | 'presentation' | 'archive' | 'raw' | 'other';

export type TFile = {
  id: number;
  file: string;
  name: string;
  document_type: TFileType;
  owner: number;
};

export type TFileProps = {
  files: TFile[];
};
