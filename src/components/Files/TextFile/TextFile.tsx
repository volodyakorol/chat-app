import {
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from '@ant-design/icons';

import { TFileProps } from '@/shared/types/file.types';

import styles from './styles.module.scss';

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
    <div className={styles.files}>
      {files.map(({ filename, src, filetype }) => (
        <div key={src} className={styles.file}>
          <a className={styles.name} href={src}>
            <span className={styles.icon}>{icon(filetype ?? '')}</span>
            {filename}
          </a>
        </div>
      ))}
    </div>
  );
};
