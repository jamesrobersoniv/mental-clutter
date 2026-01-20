# Site Customization Guide

This guide explains how to customize your Mental Clutter website.

## Creating New Posts

To create a new blog post:

1. **Create a new markdown file** in the `content/posts/` directory:
   ```bash
   hugo new content/posts/my-new-post.md
   ```
   Or manually create a file like `content/posts/my-post.md`

2. **Add front matter** at the top of the file:
   ```markdown
   +++
   date = '2025-01-20T10:00:00-08:00'
   draft = false
   title = 'My Post Title'
   author = 'Author Name'
   description = 'A brief description of the post'
   image = 'https://images.unsplash.com/photo-xxxxx?w=800'
   imageCaption = 'Image caption text'
   +++
   ```

3. **Write your content** below the front matter using Markdown:
   ```markdown
   This is my post content.

   ## Section Heading

   More content here.
   ```

### Front Matter Fields

- `date` - Publication date (ISO format)
- `draft` - Set to `false` to publish, `true` to hide
- `title` - Post title (displayed in uppercase on the post page)
- `author` - Author name (appears on post page)
- `description` - Brief description (appears below title)
- `image` - Featured image URL or local file path
- `imageCaption` - Caption for the image

### Using Photos from Your Laptop

You can use photos stored on your laptop by placing them in the `static/` directory:

1. **Create an `images` folder** (if it doesn't exist):
   ```
   static/images/
   ```

2. **Add your photos** to this folder:
   ```
   static/images/my-photo.jpg
   static/images/coffee-shop.png
   ```

3. **Reference them in your post's front matter** using the relative path:
   ```toml
   +++
   date = '2025-01-20T10:00:00-08:00'
   draft = false
   title = 'My Photo Post'
   author = 'Author Name'
   description = 'A post with local photos'
   image = '/images/my-photo.jpg'
   imageCaption = 'This is my photo'
   +++
   ```

4. **Alternatively**, you can use external URLs (like Unsplash):
   ```toml
   image = 'https://images.unsplash.com/photo-xxxxx?w=800'
   ```

The site automatically detects whether the image is a URL or local file and handles it appropriately. Local images will be cached as part of your site.

### Adding Images in Your Post Body

You can add multiple images throughout your post content using Markdown:

```markdown
+++
date = '2026-01-19T10:00:00-08:00'
draft = false
title = 'My Trip'
author = 'Your Name'
description = 'Travel photos'
image = '/images/featured.jpg'
imageCaption = 'Featured image'
+++

## My Adventure

This was an amazing experience.

![Street scene in the city](/images/street-photo.jpg)

More text about my trip...

![Another memorable moment](/images/second-photo.jpg)

Final thoughts here.
```

**Image syntax in Markdown:**
```
![Alt text describing the image](/images/filename.jpg)
```

- The `![Alt text]` part is important for accessibility
- Images appear at full width in your post
- Use the same `/images/` folder for all your photos
- You can mix featured images and body images freely

## Editing the About Page

The about page is located at `content/about.md`.

1. **Open the file:**
   ```bash
   content/about.md
   ```

2. **Edit the content** using Markdown:
   ```markdown
   +++
   title = 'About'
   +++

   Your about page content here.

   You can use **bold**, *italic*, and other Markdown formatting.
   ```

3. **Save the file** and the changes will appear on `/about/` page

## Changing the Mixcloud Player Link

The Mixcloud player appears in the bottom right corner of all pages.

1. **Open the base template:**
   ```bash
   layouts/_default/baseof.html
   ```

2. **Find the Mixcloud embed section** (around line 71-80)

3. **Update the iframe src URL** with your Mixcloud link:
   ```html
   <iframe 
     width="100%" 
     height="120" 
     src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FYOUR_USERNAME%2FYOUR_SHOW_NAME%2F" 
     frameborder="0" 
     allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;">
   </iframe>
   ```

### How to Get Your Mixcloud Feed Path

1. Go to your Mixcloud show page
2. Copy the URL path (e.g., `/jamesivvv/mental-clutter-8-do-the-machines-learn/`)
3. URL encode it by replacing `/` with `%2F`
4. Place it in the `feed=` parameter: `feed=%2Fusername%2Fshow-name%2F`

### Example

If your Mixcloud URL is:
```
https://www.mixcloud.com/jamesivvv/mental-clutter-8-do-the-machines-learn/
```

The feed path would be:
```
%2Fjamesivvv%2Fmental-clutter-8-do-the-machines-learn%2F
```

## Tips

- Posts appear in the gallery in reverse chronological order (newest first)
- Images in the gallery are automatically converted to grayscale
- Hovering over gallery cards shows a red overlay with title, date, and author
- The Mixcloud player follows visitors across all pages (using AJAX navigation)
## Git Commands for Publishing

Once you've made changes to your site, use these commands to deploy them to **www.mentalclutter.space**:

### Check your changes
```bash
git status
```
Shows which files have been modified or created.

### Stage your changes
```bash
git add -A
```
Prepares all changes for commit (or use `git add filename.md` for specific files).

### Commit your changes with a message
```bash
git commit -m "Add new post about coffee shops"
```
Always write a descriptive message about what changed.

### Push to GitHub (auto-deploys)
```bash
git push
```
Your site automatically rebuilds and deploys within 1-2 minutes.

### View deployment status
Go to: https://github.com/jamesrobersoniv/mental-clutter/actions

### Common workflow
```bash
# 1. Create a new post
hugo new content/posts/my-new-post.md

# 2. Edit the post in your editor
# (fill in front matter and content)

# 3. Preview locally
hugo server
# Visit http://localhost:1313

# 4. When happy, commit and push
git add -A
git commit -m "Publish: My New Post"
git push

# 5. Wait 1-2 minutes for deployment
# 6. Check your site at www.mentalclutter.space
```