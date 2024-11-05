import type { StorybookConfig } from '@storybook/svelte-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|ts|svelte)"
    ],
    addons: [
        "@storybook/addon-svelte-csf",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/sveltekit",
        options: {}
    },
    staticDirs: ["../static"],
    viteFinal: async (config) => {
        return mergeConfig(config, {
            css: {
                preprocessorOptions: {
                    scss: {
                        api: 'modern-compiler'
                    }
                }
            }
        })
    }
};
export default config;
