import '../src/app.css'; // TailwindCSS의 글로벌 스타일 파일 로드

/** @type { import('@storybook/svelte').Preview } */
const preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light', // 기본값은 'light'
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
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
        { name: 'light', value: '#ffffff' }, // Light 모드 배경색
        { name: 'dark', value: '#27272a' }, // Dark 모드 배경색
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // TailwindCSS 다크 모드 클래스 적용
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);

      // Storybook Preview 배경색 변경
      const background = theme === 'dark' ? '#27272a' : '#ffffff';
      document.body.style.backgroundColor = background;

      return Story();
    },
  ],
};

export default preview;
