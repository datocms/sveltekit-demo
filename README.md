<!--datocms-autoinclude-header start-->

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60"></a>

👉 [Visit the DatoCMS homepage](https://www.datocms.com) or see [What is DatoCMS?](#what-is-datocms)

---

<!--datocms-autoinclude-header end-->

# SvelteKit + DatoCMS demo

This is a demo of how to use SvelteKit and DatoCMS together.

The purpose of this repo is to have a quick start reference that can be set up with the "one-click" button below.

## Demo

Have a look at the end result live:

### [https://sveltekit-demo-eta.vercel.app/](https://sveltekit-demo-eta.vercel.app/)

## How to use

### Quick start

1. [Create an account on DatoCMS](https://datocms.com).

2. Make sure that you have set up the [Github integration on Vercel](https://vercel.com/docs/git/vercel-for-github).

3. Let DatoCMS set everything up for you clicking this button:

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/sveltekit-demo)

## Preview mode and deploy environment

To take advantage of preview mode, deploy environment must support edge functions. That shouldn't be an issue: most of the providers have some form of edge function, these days.

## Safety check before production

If you use this demo as a starting point for a project and you plan to deploy to production, **take some time to understand how to properly configure secrets, so that no reserved information (like, for example, DatoCMS contents in draft status) gets leaked**.

Before deploying to production, you should set the following 4 environment variables:

- `PREVIEW_MODE_PASSWORD`: the password that users must have to enable preview mode;
- `PUBLIC_DATOCMS_API_TOKEN`: a DatoCMS token with read-only permissions and no access to draft contents: this token can be included in the bundles produced by Nuxt at deploy;
- `DRAFT_ENABLED_DATOCMS_API_TOKEN`: a DatoCMS token with read-only permissions and **access to draft contents**: this token will be potentially accessible only to users who have access to the preview mode (thus, only to people that know the preview mode password and are therefore expected to see draft contents);
- `PREVIEW_MODE_ENCRYPTION_SECRET`: this secret is meant to sign the cookie that enables preview mode: it can be any random string.

With these secrets in place, you can safely go to production.

### Local setup

Once the setup of the project and repo is done, clone the repo locally.

#### Set up environment variables

In your DatoCMS' project, go to the **Settings** menu at the top and click **API tokens**.

Then click **Bundle-safe, read-only token** and copy the token.

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Then set each variable in `.env`.

## Developing your project locally

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

<!--datocms-autoinclude-footer start-->

---

# What is DatoCMS?

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60" alt="DatoCMS - The Headless CMS for the Modern Web"></a>

[DatoCMS](https://www.datocms.com/) is the REST & GraphQL Headless CMS for the modern web.

Trusted by over 25,000 enterprise businesses, agencies, and individuals across the world, DatoCMS users create online content at scale from a central hub and distribute it via API. We ❤️ our [developers](https://www.datocms.com/team/best-cms-for-developers), [content editors](https://www.datocms.com/team/content-creators) and [marketers](https://www.datocms.com/team/cms-digital-marketing)!

**Why DatoCMS?**

- **API-First Architecture**: Built for both REST and GraphQL, enabling flexible content delivery
- **Just Enough Features**: We believe in keeping things simple, and giving you [the right feature-set tools](https://www.datocms.com/features) to get the job done
- **Developer Experience**: First-class TypeScript support with powerful developer tools

**Getting Started:**

- ⚡️ [Create Free Account](https://dashboard.datocms.com/signup) - Get started with DatoCMS in minutes
- 🔖 [Documentation](https://www.datocms.com/docs) - Comprehensive guides and API references
- ⚙️ [Community Support](https://community.datocms.com/) - Get help from our team and community
- 🆕 [Changelog](https://www.datocms.com/product-updates) - Latest features and improvements

**Official Libraries:**

- [**Content Delivery Client**](https://github.com/datocms/cda-client) - TypeScript GraphQL client for content fetching
- [**REST API Clients**](https://github.com/datocms/js-rest-api-clients) - Node.js/Browser clients for content management
- [**CLI Tools**](https://github.com/datocms/cli) - Command-line utilities for schema migrations (includes [Contentful](https://github.com/datocms/cli/tree/main/packages/cli-plugin-contentful) and [WordPress](https://github.com/datocms/cli/tree/main/packages/cli-plugin-wordpress) importers)

**Official Framework Integrations**

Helpers to manage SEO, images, video and Structured Text coming from your DatoCMS projects:

- [**React Components**](https://github.com/datocms/react-datocms)
- [**Vue Components**](https://github.com/datocms/vue-datocms)
- [**Svelte Components**](https://github.com/datocms/datocms-svelte)
- [**Astro Components**](https://github.com/datocms/astro-datocms)

**Additional Resources:**

- [**Plugin Examples**](https://github.com/datocms/plugins) - Example plugins we've made that extend the editor/admin dashboard
- [**Starter Projects**](https://www.datocms.com/marketplace/starters) - Example website implementations for popular frameworks
- [**All Public Repositories**](https://github.com/orgs/datocms/repositories?q=&type=public&language=&sort=stargazers)

<!--datocms-autoinclude-footer end-->
