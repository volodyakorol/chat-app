import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { faFloppyDisk, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { notification } from 'antd';

import { Input } from '@/components';

import s from './styles.module.scss';

const MAX_FILES = 3;

export const MessageInput = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onAttachmentClick = () => fileInputRef.current?.click();
  const onAttachmentChange = () => {
    const files = Array.from(fileInputRef?.current?.files ?? []);

    if (files.length > MAX_FILES) return notification.error({ message: 'maximum 3 files' });

    setAttachments(files);
  };

  const onSentClick = () => {};

  return (
    <>
      <Input
        size='large'
        placeholder='Type something'
        prefix={<FontAwesomeIcon className='pointer' onClick={onAttachmentClick} color='#C5C7D2' icon={faPaperclip} />}
        addonAfter={
          <FontAwesomeIcon className='pointer' onClick={onSentClick} color='#C5C7D2' icon={faFloppyDisk} />
        }
      />
      <input
        ref={fileInputRef}
        className={s.hidedInput}
        type='file'
        accept='image/*,.ai,.psd,.pdf,.doc,.docx,.csv,.zip,.rar,.ppt,.pptx,.pps,.ppsx,.odt,.rtf,.xls,.xlsx,.txt,.pub,.html,.7z,.eml'
        onChange={onAttachmentChange}
        multiple
      />
    </>
  );
};
