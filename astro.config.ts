import { defineConfig } from 'astro/config';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const githubPagesBase = process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}` : undefined;

export default defineConfig({
  output: 'static',
  // GitHub project pages live below /<repository>/; custom-domain and OSS builds stay at root.
  base: githubPagesBase,
  build: { format: 'directory' },
  vite: {
    server: {
      watch: {
        // Transcoding binaries and other scratch artifacts may be locked on Windows.
        // They are never source inputs, so do not ask Vite to watch them.
        ignored: ['**/tmp/**'],
      },
    },
  },
});
