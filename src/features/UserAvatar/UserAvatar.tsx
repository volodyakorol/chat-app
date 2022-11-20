import { useRef, useState } from 'react';
import { FixedCropperRef } from 'react-advanced-cropper';
import { Avatar, Modal } from 'antd';
import clsx from 'clsx';

import { ImageCropper } from '@/shared/lib';

import s from './styles.module.scss';

type PropsT = {
  src: string;
  canEdit?: boolean;
};

export const UserAvatar = ({ canEdit, src }: PropsT) => {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(src);

  const showModal = () => canEdit && setIsModalVisible(true);

  const onClose = () => setIsModalVisible(false);
  const onSave = () => {
    const canvas = cropperRef.current?.getCanvas();

    if (canvas) {
      canvas.toBlob((blob) => {
        if (!blob) return null;
        // const image = new File([blob], '.jpg');

        // console.log('send this', image);
        // console.log('send this', canvas.toDataURL());
        setAvatar(canvas.toDataURL());
      }, 'image/jpeg');
    }
  };

  return (
    <>
      <div onClick={showModal}>
        <Avatar src={avatar} size={90} shape='circle' className={clsx({ [s.avatar]: canEdit })} />
      </div>

      <Modal
        title='Profile photo'
        visible={isModalVisible}
        bodyStyle={{ padding: 0 }}
        onCancel={onClose}
        onOk={onSave}
      >
        <div className={s.cropper}>
          <ImageCropper src={src} ref={cropperRef} />
        </div>
      </Modal>
    </>
  );
};
