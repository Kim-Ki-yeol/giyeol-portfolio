import { defineConfig } from 'vite';
export default defineConfig({ base: process.env.GITHUB_REPOSITORY && !process.env.GITHUB_REPOSITORY.endsWith('.github.io') ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] + '/' : '/' });
