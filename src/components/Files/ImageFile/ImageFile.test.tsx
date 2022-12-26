import { render, screen } from '@testing-library/react';

import { ImageFile } from '@/components';

describe('ImageFile', () => {
  it('render a ImageFile', () => {
    const files = [
      { filename: 'file1', src: 'src1' },
      { filename: 'file2', src: 'src2' },
    ];

    render(<ImageFile files={files} />);

    expect(screen.getAllByTestId('image-file').length).toEqual(files.length);
  });
});
