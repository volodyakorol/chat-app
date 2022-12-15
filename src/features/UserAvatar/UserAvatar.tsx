import { useRef, useState } from 'react';
import { FixedCropperRef } from 'react-advanced-cropper';
import { Avatar, AvatarProps, Modal } from 'antd';
import clsx from 'clsx';

import { SDN_URL } from '@/shared/constant';
import { ImageCropper } from '@/shared/lib';

import s from './styles.module.scss';

type PropsT = AvatarProps & {
  src?: string;
  canEdit?: boolean;
  onAvatarChange?: (image: File) => void;
};

export const UserAvatar = ({ canEdit, src = '', onAvatarChange, ...avatarProps }: PropsT) => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isUrlSrc = new RegExp(/(ftp|http|https):\/\/[^ "]+$/).test(src);

  const onClose = () => setIsModalVisible(false);
  const showModal = () => canEdit && setIsModalVisible(true);

  const onSave = () => {
    const canvas = cropperRef.current?.getCanvas();

    if (canvas) {
      canvas.toBlob((blob) => {
        if (!blob) return null;
        const image = new File([blob], '.jpg');
        onAvatarChange && onAvatarChange(image);
        onClose();
      }, 'image/jpeg');
    }
  };

  return (
    <>
      <div onClick={showModal}>
        <Avatar
          src={isUrlSrc ? src : SDN_URL + src}
          size={90}
          shape='circle'
          className={clsx({ [s.avatar]: canEdit })}
          {...avatarProps}
        />
      </div>

      <Modal title='Profile photo' open={isModalVisible} bodyStyle={{ padding: 0 }} onCancel={onClose} onOk={onSave}>
        <div className={s.cropper}>
          <ImageCropper src={src} ref={cropperRef} />
        </div>
      </Modal>
    </>
  );
};
