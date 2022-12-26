import { render, screen } from '@testing-library/react';

import { AudioFile } from '@/components';

describe('AudioFile', () => {
  it('render a AudioFile', () => {
    const files = [
      { filename: 'file1', src: 'src1' },
      { filename: 'file2', src: 'src2' },
    ];

    render(<AudioFile files={files} />);

    expect(screen.getAllByTestId('audio-file').length).toEqual(files.length);
  });
});
