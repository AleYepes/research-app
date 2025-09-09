import { expect, test } from 'vitest';
import { $fetch } from '@nuxt/test-utils';

test('should render the index page', async () => {
  const response = await $fetch('/');
  expect(response).toContain('Welcome');
});
