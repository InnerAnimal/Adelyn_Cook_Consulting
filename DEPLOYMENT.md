# GitHub Pages Deployment Guide

This document explains how the Adelyn Cook Consulting website is deployed to GitHub Pages using GitHub Actions.

## Overview

The site uses an automated deployment workflow that:
1. Builds the Astro site on every push to `main`
2. Uploads the built static files to GitHub Pages
3. Makes the site available at: https://inneranimal.github.io/Adelyn_Cook_Consulting

## Prerequisites

Before deployment can work, you need to configure GitHub Pages in the repository settings:

### One-Time Setup

1. **Navigate to Repository Settings**
   - Go to https://github.com/InnerAnimal/Adelyn_Cook_Consulting
   - Click on "Settings" tab

2. **Enable GitHub Pages**
   - In the left sidebar, click "Pages"
   - Under "Source", select **"GitHub Actions"**
   - This allows the workflow to deploy to Pages

3. **Verify Permissions**
   - The workflow has the necessary permissions configured:
     ```yaml
     permissions:
       contents: read
       pages: write
       id-token: write
     ```

## How Deployment Works

### Automatic Deployment

Every time you push changes to the `main` branch:

1. GitHub Actions triggers the workflow (`.github/workflows/deploy.yml`)
2. The workflow runs two jobs:
   - **Build Job**: 
     - Checks out the code
     - Sets up Node.js 20
     - Installs dependencies with `npm ci`
     - Builds the site with `npm run build`
     - Uploads the `dist/` folder as a Pages artifact
   - **Deploy Job**:
     - Takes the artifact from the build job
     - Deploys it to GitHub Pages
3. The site becomes available at the configured URL

### Manual Deployment

You can manually trigger a deployment:

1. Go to the "Actions" tab in GitHub
2. Click on "Deploy Astro site to Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

## Site Configuration

The site is configured for GitHub Pages in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://inneranimal.github.io/Adelyn_Cook_Consulting',
  base: '/Adelyn_Cook_Consulting',
  // ... other config
});
```

- **site**: The full URL where the site will be hosted
- **base**: The base path for all links and assets

This ensures all URLs work correctly when deployed to a GitHub Pages project site.

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) includes:

- **Triggers**: Push to `main` branch or manual trigger
- **Node Version**: 20.x (LTS)
- **Build Command**: `npm run build`
- **Output Directory**: `./dist`
- **Deployment Method**: GitHub Pages Actions

## Monitoring Deployments

To check the status of deployments:

1. Go to the "Actions" tab in the repository
2. Click on the latest workflow run
3. View the logs for build and deployment steps

Successful deployments will show:
- ✓ Build job completed
- ✓ Deploy job completed
- The deployment URL in the deploy job output

## Troubleshooting

### Deployment Fails

If deployment fails:

1. Check the Actions tab for error messages
2. Common issues:
   - GitHub Pages not enabled in settings
   - Source not set to "GitHub Actions"
   - Build errors (check build job logs)
   - Permission errors (verify workflow permissions)

### Site Not Updating

If the site doesn't update after deployment:

1. Check that the workflow completed successfully
2. Clear your browser cache
3. Wait a few minutes for GitHub Pages CDN to update
4. Verify the correct branch is being deployed

### Build Errors

If the build fails:

1. Test the build locally:
   ```bash
   npm run build
   ```
2. Fix any errors
3. Commit and push changes
4. The workflow will automatically retry

## Local Development

To test the production build locally:

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Preview the built site
npm run preview
```

This will start a local server with the production build, allowing you to verify everything works before deploying.

## Security

The workflow uses:
- **GITHUB_TOKEN**: Automatically provided by GitHub Actions
- **Minimal permissions**: Only what's needed for deployment
- **ID token**: For secure authentication with GitHub Pages

No secrets or credentials need to be configured manually.

## References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)
