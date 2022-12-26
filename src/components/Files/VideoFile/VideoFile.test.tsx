import { render, screen } from '@testing-library/react';

import { VideoFile } from '@/components';

describe('VideoFile', () => {
  it('render a VideoFile', () => {
    render(
      <VideoFile
        files={[
          { filename: 'file1', src: 'src1' },
          { filename: 'file1', src: 'src2' },
        ]}
      />,
    );

    expect(screen.getAllByTestId('video-file').length).toEqual(2);
  });
});
