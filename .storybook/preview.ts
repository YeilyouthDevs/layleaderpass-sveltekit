import type { Preview } from '@storybook/svelte';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css';
import '$style/global.css';

import { theme as themeStore } from '../src/lib/store/theme';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: 'white' },
                { name: 'dark', value: 'rgb(63, 63, 63)' },
            ]
        }
    },
    decorators: [
        (Story, context) => {
            const { args } = context;

            themeStore.set(args.theme || 'light');

            return Story({ props: args })
        }
    ],
    args: {
        theme: 'light'
    },
    argTypes: {
        theme: {
            name: 'Theme',
            options: ['light', 'dark'],
            control: { type: 'radio' }
        }
    }
};

export default preview;
