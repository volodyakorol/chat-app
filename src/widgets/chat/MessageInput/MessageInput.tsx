import { useRef, useState } from 'react';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';

import { Files, Input } from '@/components';

import styles from './styles.module.scss';

const MAX_FILES = 3;

type TMessageInputProps = {
  onSend: (content: string, attachments: File[]) => void;
};

export const MessageInput = ({ onSend }: TMessageInputProps) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onAttachmentClick = () => fileInputRef.current?.click();
  const onAttachmentChange = () => {
    const files = Array.from(fileInputRef?.current?.files ?? []);

    if (files.length > MAX_FILES) return notification.error({ message: 'maximum 3 files' });

    setAttachments(files);
  };

  const onSentClick = () => {
    onSend(content, attachments);
    setAttachments([]);
    setContent('');
  };

  return (
    <>
      {!!attachments.length && (
        <div className={styles.attachments}>
          <Files
            files={attachments.map((file) => ({
              filename: file.name,
              src: URL.createObjectURL(file),
              mimetype: file.type,
            }))}
          />
        </div>
      )}

      <Input
        size='large'
        placeholder='Type something'
        onPressEnter={onSentClick}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        prefix={<FontAwesomeIcon className='pointer' onClick={onAttachmentClick} color='#C5C7D2' icon={faPaperclip} />}
        addonAfter={
          <FontAwesomeIcon
            data-testid='sent-btn'
            className='pointer'
            onClick={onSentClick}
            color='#C5C7D2'
            icon={faPaperPlane}
          />
        }
      />
      <input
        ref={fileInputRef}
        className={styles.hidedInput}
        type='file'
        accept='image/*,application/*,video/*,audio/*'
        onChange={onAttachmentChange}
        multiple
      />
    </>
  );
};
