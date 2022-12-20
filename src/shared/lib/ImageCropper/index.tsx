import { ChangeEvent, forwardRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import {
  CircleStencil,
  Cropper,
  FixedCropperProps,
  FixedCropperRef,
  FixedCropperSettings,
} from 'react-advanced-cropper';
import { CloudUploadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import stylesheet from './styles.module.scss';

type CropAction = {
  label: string;
  action: () => void;
  icon: ReactNode;
};

type PropsT = Omit<FixedCropperProps, 'stencilSize'> & {
  actions?: (_actions: CropAction[]) => CropAction[];
};

export const ImageCropper = forwardRef<FixedCropperRef, PropsT>(({ src, actions, ...props }, ref) => {
  const cropperRef = ref as RefObject<FixedCropperRef>;
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(src);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const triggerFileSelect = () => inputRef.current?.click();

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  const defaultCropActions: CropAction[] = [
    {
      label: 'Flip horizontal',
      action: () => cropperRef.current?.flipImage(true, false),
      icon: <SwapOutlined />,
    },
    {
      label: 'Flip vertical',
      action: () => cropperRef.current?.flipImage(false, true),
      icon: <SwapOutlined rotate={90} />,
    },
    {
      label: 'Rotate right',
      action: () => cropperRef.current?.rotateImage(90),
      icon: <RotateRightOutlined />,
    },
    {
      label: 'Rotate left',
      action: () => cropperRef.current?.rotateImage(-90),
      icon: <RotateLeftOutlined />,
    },
    {
      label: 'Change image',
      action: triggerFileSelect,
      icon: <CloudUploadOutlined />,
    },
  ];

  const cropActions = actions ? actions(defaultCropActions) : defaultCropActions;

  return (
    <div className={stylesheet.cropper_wrapper}>
      {image ? (
        <>
          <Cropper
            src={image}
            ref={cropperRef}
            className={stylesheet.cropper}
            stencilComponent={CircleStencil}
            style={{ minHeight: cropActions.length * 40 + 80 }}
            {...(props as FixedCropperSettings)}
          />

          <div className={stylesheet.actions}>
            {cropActions.map(({ action, icon, label }) => (
              <Tooltip key={label} overlay={label} placement='right'>
                <Button className={stylesheet.action} icon={icon} onClick={action} />
              </Tooltip>
            ))}
          </div>
        </>
      ) : (
        <div className={stylesheet.upload} onClick={triggerFileSelect}>
          <CloudUploadOutlined />
          <p> Upload image</p>
        </div>
      )}
      <input type='file' accept='image/*' ref={inputRef} onChange={uploadImage} className={stylesheet.fileInput} />
    </div>
  );
});
