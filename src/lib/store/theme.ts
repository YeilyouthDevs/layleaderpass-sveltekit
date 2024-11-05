// src/stores/theme.js
import { get, writable } from 'svelte/store';

function getPreferredTheme() {
    // 테마 초기화
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme;
    } else {
        document.documentElement.className = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return document.documentElement.className;
}

export const theme = writable(getPreferredTheme());

export function initThemes() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        theme.set(savedTheme);
    }
    theme.subscribe((currentTheme) => {
        document.documentElement.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
    });
}

export function toggleTheme() {
    theme.update((currentTheme) => {
        const toChangeTheme = currentTheme === 'light' ? 'dark' : 'light'
        return toChangeTheme;
    });
}

export function themeSwitcher(factories: {[key: string]: CallableFunction}) {
    const currentTheme = get(theme);

    for (const [name, factory] of Object.entries(factories)) {
        if (currentTheme === name) factory();
    }
}