import '@testing-library/jest-dom/vitest';

import { describe, expect, it } from 'vitest';
import { render } from '../../__test__/utils';
import { Page } from '../index/+Page';

describe('Home Page', () => {
  it('Renders', async () => {
    const [{ findByText }] = await render(<Page />);
    expect(await findByText('LoveLive! Sorter')).toBeInTheDocument();
  });
});
