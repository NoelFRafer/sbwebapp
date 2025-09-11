# Sangguniang Bayan ng Capalonga Website

A modern React application built with Vite and TypeScript for the Sangguniang Bayan ng Capalonga.

## Features

- **Vision, Mission and Trusts Carousel**: Interactive slideshow displaying key messages
- **News Section**: Dynamic news display with navigation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Database Integration**: Connected to Supabase for dynamic content management

## Using Local Images

### Adding Images to Your Project

1. **Place images in the public folder:**
   ```
   public/
   └── images/
       ├── your-image-1.jpg
       ├── your-image-2.png
       └── your-image-3.jpg
   ```

2. **Update your Supabase slides table:**
   - Navigate to your Supabase project dashboard
   - Go to the `slides` table
   - Update the `image_url` column with local paths like `/images/your-image-1.jpg`

3. **Image Requirements:**
   - Recommended size: 400x600px for portrait orientation
   - Supported formats: JPG, PNG, WebP
   - Keep file sizes optimized for web (under 500KB recommended)

### Fallback Images

The application includes automatic fallback to a default image if local images fail to load, ensuring a smooth user experience.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Database Schema

The application uses two main tables:
- `slides`: For the carousel content
- `news_items`: For news articles

## Deployment

This application is deployed using Bolt Hosting and can be accessed at your configured domain.