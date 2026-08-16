# dev-portfolio-angular

[![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A single-page developer portfolio template built with Angular 19 and Tailwind
CSS, prerendered to static files and deployed to GitHub Pages.

Every name, link, project, and testimonial in this repository is a placeholder.
It ships as **John Doe**, a fictional engineer, so you can clone it, replace the
content, and have a working site without untangling somebody else's details
first.

**Demo:** [jamith.com/dev-portfolio-angular](https://jamith.com/dev-portfolio-angular)

## What is in it

One page, composed of eleven section components:

| Section | Content |
| --- | --- |
| Hero | Name, title, photo, social links, resume button |
| About | Short bio |
| What I Do | Service cards |
| Skills | Grouped technology list |
| Featured Projects | Cards with images, tags, and links |
| Experience | Roles with dates and bullet points |
| Education | Degrees and institutions |
| Languages | Spoken languages with proficiency |
| Testimonials | Client reviews, featured ones first |
| Blog Posts | Pulled from an RSS feed at runtime |
| Contact | Email and social links |

Also included: dark mode with a persisted toggle, responsive layout down to
small phones, SSR prerendering for SEO, and a `404.html` copied from the app
shell so deep links work on GitHub Pages.

## Running it

Requires Node 20 or newer.

```bash
npm install
npm start        # localhost:4200, live reload
npm run build    # prerendered output in dist/portfolio/browser
npm test         # Karma + Jasmine
```

## Making it yours

Content lives in three places. There is no CMS and no database.

**1. Profile and social links** are in `src/assets/profile.yml`, read at runtime
by `ProfileService`:

```yaml
name: John Doe
title: Senior Software Engineer
website: https://example.com
blog: https://blog.example.com

socialLinks:
  - name: GitHub
    url: https://github.com/johndoe
    icon: github
```

Delete any social entry you do not use. Icon names map to the SVG set in the
shared icon component.

**2. Projects and testimonials** are typed arrays in
`src/app/pages/home/home.component.ts`. Each project looks like this:

```ts
{
  id: 1,
  title: "Task Management Platform",
  description: "Team task board with drag-and-drop scheduling, ...",
  image: "assets/images/projects/placeholder-web.svg",
  technologies: ["Angular", "TypeScript", "TailwindCSS"],
  link: "https://github.com/johndoe/task-platform",  // repository
  demoUrl: "https://example.com/demo/tasks",         // live site
  category: "Web"
}
```

There are two arrays. `recentProjects` is what the Featured Projects section
shows; `allProjects` fills the modal behind **View All**, filtered by
`category`. Testimonials are one array, and `featured: true` promotes a review
onto the page.

Replace the placeholder SVGs in `src/assets/images/projects/` with real
screenshots.

**3. Everything else** is markup, one file per section, under
`src/app/shared/components/sections/`. Experience, education, about, languages,
and contact are edited directly in their templates.

Also replace:

- `src/assets/images/profile.webp` and `profile-36px.webp` with your photo
- `src/assets/resume.pdf` with your resume
- `src/assets/favicon/` with your own marks, and the name in `site.webmanifest`
- the title, description, and Open Graph and Twitter card tags in
  `src/index.html`

### The blog section

`BlogPostService` fetches an RSS feed in the browser, keeps posts in one
category, and shows the six most recent. Point it at your own feed in
`src/app/services/blog-post.service.ts`:

```ts
private readonly feedUrl = 'https://example.com/feed.xml';
private readonly CATEGORY_FILTER = 'tutorial';
```

The feed host must send CORS headers, or the request is blocked. Parsing runs
client-side only, since prerendering has no `DOMParser`. If the feed is
unreachable the section renders empty and nothing else breaks. Remove
`<app-blog-posts-section>` from the home template if you do not want it.

### Analytics

`src/index.html` carries placeholder Google Analytics and AdSense IDs
(`G-XXXXXXXXXX`, `ca-pub-0000000000000000`). Replace them with your own or
delete both script tags.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds on every push to `main` and publishes with
`actions/deploy-pages`. Two things to set up:

1. **Settings → Pages → Source → GitHub Actions.**
2. **The base href**, in `angular.json` under `projects.portfolio.architect.build.options.baseHref`.

The base href must match where the site is served:

| Where it is served | `baseHref` |
| --- | --- |
| `username.github.io/repo-name` | `/repo-name/` |
| `username.github.io` (user site) | `/` |
| A custom domain at the root | `/` |

This repository is set to `/dev-portfolio-angular/`. Getting it wrong loads the
HTML but leaves every asset 404ing.

For a custom domain, add a `CNAME` file to `src/assets/` containing the domain
and register it under Settings → Pages.

## Layout of the source

```
src/
  app/
    pages/home/          the page, and the project and testimonial data
    shared/components/
      sections/          the eleven section components
      ...                header, footer, icons, shared UI
    services/            profile.yml reader, RSS reader
  assets/
    profile.yml          name, title, social links
    images/              photo, project images, blog fallback
    resume.pdf
  index.html             meta tags, structured data, analytics
  styles.scss            Tailwind entry and global styles
```

Colours, fonts, and the animation keyframes are in `tailwind.config.js`. The
theme is two colours, `primary` and `secondary`, used throughout as
`text-primary dark:text-secondary`.

## Notes

- The production build exceeds Angular's default bundle budget by roughly 14 kB
  and warns about it. Raise the budget in `angular.json` if the warning bothers
  you.
- `yaml` is a CommonJS package and prints an optimization notice on every build.
  Harmless.
- The build logs an `HttpErrorResponse` for `ng-localhost` during prerendering.
  That is `ProfileService` trying to fetch `profile.yml` with no server to fetch
  it from. The build still exits zero and the profile loads in the browser.
- `@angular/service-worker` is installed but not configured. Add
  `ng add @angular/pwa` if you want offline support.

## License

[MIT](LICENSE). Use it, change it, ship it. Attribution is welcome but not
required.
