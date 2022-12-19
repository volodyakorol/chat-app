import {
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from '@ant-design/icons';

import { TFileProps } from '@/shared/types/file.types';

import stylesheet from './styles.module.scss';

export const TextFile = ({ files }: { files: (TFileProps & { filetype?: string })[] }) => {
  const icon = (fileExtension: string) => {
    if (['pdf'].includes(fileExtension)) return <FilePdfOutlined />;
    if (['txt'].includes(fileExtension)) return <FileTextOutlined />;
    if (['ppt', 'pptx'].includes(fileExtension)) return <FilePptOutlined />;
    if (['doc', 'docx'].includes(fileExtension)) return <FileWordOutlined />;
    if (['7z', 'rar', 'zip', 'zipx'].includes(fileExtension)) return <FileZipOutlined />;

    return <FileUnknownOutlined />;
  };

  return (
    <div className={stylesheet.files}>
      {files.map(({ filename, src, filetype }, index) => (
        <div key={index} className={stylesheet.file}>
          <a className={stylesheet.name} onClick={() => console.log(src)}>
            <span className={stylesheet.icon}>{icon(filetype ?? '')}</span>
            {filename}
          </a>
        </div>
      ))}
    </div>
  );
};
