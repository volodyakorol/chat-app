import { render, screen } from '@testing-library/react';

import { TextFile } from '@/components';

describe('TextFile', () => {
  it('render a TextFile', () => {
    const files = [
      { filename: 'file1', src: 'src1', filetype: 'pdf' },
      { filename: 'file2', src: 'src2', filetype: 'doc' },
      { filename: 'file3', src: 'src3', filetype: 'ppt' },
      { filename: 'file4', src: 'src4', filetype: 'txt' },
      { filename: 'file5', src: 'src5', filetype: 'rar' },
    ];

    render(<TextFile files={files} />);

    expect(screen.getAllByTestId('text-file').length).toEqual(files.length);
  });
});
