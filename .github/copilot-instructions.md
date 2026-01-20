# Copilot Instructions for Mental Clutter

**Project Type:** Hugo static site generator for a minimal personal blog

## Architecture Overview

This is a Hugo-based static site with a custom gallery-first layout for blog posts. The project uses the **Paper theme** as a base, but intentionally overrides most functionality through custom layouts and styles.

### Key Components

- **`layouts/_default/`** - Custom HTML templates that override theme defaults
  - `baseof.html` - Root template with Mixcloud embed integration
  - `list.html` - Gallery grid layout for post listings (homepage, archives)
  - `single.html` - Post detail page layout
- **`static/css/`** - Custom styling, especially gallery masonry layout
  - `gallery.css` - Grid-based gallery display with hover overlays
  - `elephant-art/` - Responsive layout utilities from elephant.art framework
  - `custom.css` - Site-specific customizations
- **`content/`** - Markdown source files
  - `posts/` - Blog post markdown files
  - `about.md` - About page content
- **`hugo.toml`** - Site configuration; disable theme CSS via `useThemeCSS = false` if needed

### Data Flow

1. Markdown files in `content/posts/` contain TOML front matter (date, title, author, description, image, imageCaption)
2. Hugo templates render list view as CSS Grid gallery with post images
3. Clicking gallery cards navigates to single post detail page
4. Mixcloud player (embedded in baseof.html) appears on all pages in bottom right corner

## Critical Conventions & Patterns

### Front Matter for Posts

All posts in `content/posts/` must include this structure:
```toml
+++
date = '2025-01-20T10:00:00-08:00'
draft = false
title = 'Post Title'
author = 'Author Name'
description = 'Brief description shown on card'
image = 'https://... or relative/path'
imageCaption = 'Optional caption on post page'
+++
```

### Image Handling in Templates

Templates check multiple image field names for flexibility:
```go
{{ $image := .Params.image }}
{{ if not $image }}{{ $image = .Params.featuredImage }}{{ end }}
{{ if not $image }}{{ $image = index (.Params.images) 0 }}{{ end }}
```
- External URLs detected with `hasPrefix $image "http"` (use as-is)
- Relative paths wrapped with `absURL` filter (resolve to site root)
- Gallery.css enforces 4:3 aspect ratio via `aspect-ratio: 4 / 3`

### Gallery Layout CSS

- Uses CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- Posts sorted by date descending: `.ByDate.Reverse` in templates
- Hover overlay shows title (uppercase), date, and author via `.article-card-overlay`
- Use `!important` flags in gallery.css to override theme defaults (intentional pattern)

### Page Sorting & Filtering

- `mainSections = ['posts']` in hugo.toml restricts homepage to posts only
- `where site.RegularPages "Type" "in" (site.Params.mainSections)` filters page types
- All listings reverse-sorted by date (newest first)

## Developer Workflows

### Starting Development
```bash
hugo server
# Site loads at http://localhost:1313 with live reload
```

### Building for Deployment
```bash
hugo
# Output written to public/ directory (can deploy to GitHub Pages, Netlify, Vercel)
```

### Creating Posts
```bash
hugo new content/posts/post-slug.md
```
Manually populate front matter with date, title, author, description, and image URL.

### Updating Mixcloud Player
Edit `layouts/_default/baseof.html` around line 71-80. URL format: `feed=%2FUSERNAME%2FSHOW_NAME%2F` (forward slashes encoded as %2F).

## Integration Points

- **Theme:** Paper theme (github.com/nanxiaobei/hugo-paper) - mostly overridden by custom layouts
- **External Assets:** Google Fonts (EB Garamond), Mixcloud player iframe
- **CSS Framework:** elephant.art flex-masonry utilities for responsive grid support
- **Front Matter Format:** TOML (not YAML) - required for all posts

## Files to Know

| File | Purpose |
|------|---------|
| [hugo.toml](hugo.toml) | Site config, theme selection, menu structure |
| [layouts/_default/baseof.html](layouts/_default/baseof.html) | Root template, CSS/JS includes, Mixcloud embed |
| [layouts/_default/list.html](layouts/_default/list.html) | Gallery grid logic for post listings |
| [layouts/_default/single.html](layouts/_default/single.html) | Post detail page layout |
| [static/css/gallery.css](static/css/gallery.css) | Grid layout, hover effects, card styling |
| [content/posts/](content/posts/) | All blog post markdown files |
| [GUIDE.md](GUIDE.md) | User-facing customization guide |
