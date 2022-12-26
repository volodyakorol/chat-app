import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/react';

import { InfoItem } from '@/components';

describe('InfoItem', () => {
  it('render a InfoItem', () => {
    render(<InfoItem label='label' info='info' icon={faArrowAltCircleLeft} />);

    expect(screen.getByText(/label info/i)).toBeInTheDocument();
  });

  it('render null if no info', () => {
    const { container } = render(<InfoItem label='label' info='' icon={faArrowAltCircleLeft} />);

    expect(container).toBeEmptyDOMElement();
  });
  it('toMatchSnapshot', () => {
    render(<InfoItem label='label' info='' icon={faArrowAltCircleLeft} />);

    expect(screen).toMatchSnapshot();
  });
});
