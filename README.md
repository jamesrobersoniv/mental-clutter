# Mental Clutter

A minimal Hugo static website with a clean gallery layout and integrated Mixcloud player.

## Features

- Black background with grayscale gallery images
- Red hover effect on gallery cards
- Fixed Mixcloud player in bottom right corner
- Clean post layout with title, description, image, and content

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) installed on your system

### Development

1. **Start the development server:**
   ```bash
   hugo server
   ```
   The site will be available at `http://localhost:1313`

2. **Build the site:**
   ```bash
   hugo
   ```
   This generates the static site in the `public/` directory.

## Project Structure

```
.
├── content/        # Your content (markdown files)
│   ├── posts/     # Blog posts
│   └── about.md   # About page
├── layouts/       # Custom templates
├── static/        # Static files (CSS, JS, images)
├── hugo.toml      # Site configuration
└── themes/        # Hugo themes (Paper theme)
```

## Customization

See [GUIDE.md](GUIDE.md) for instructions on:
- Creating new posts
- Editing the about page
- Changing the Mixcloud player link

## Deployment

The `public/` directory contains the generated static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## License

MIT
