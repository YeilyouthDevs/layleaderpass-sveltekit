

/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  staticDirs: ['../static'],
  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  framework: {
    "name": "@storybook/sveltekit",
    "options": {}
  }
};
export default config;