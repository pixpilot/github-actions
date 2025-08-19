import makeConfig from '@pixpilot/eslint-config';

/**
 * @type {ReturnType<typeof makeConfig>}
 */
const baseConfig = makeConfig({
  pnpm: false,
  turbo: true,
  yaml: true,
});

export default baseConfig;
