# Life at Zahara - Content Management Guide

## How to Add Student Testimonials

### 1. Add Video Files
Place your testimonial video files in `public/videos/` folder.
Example: `public/videos/testimonial-1.mp4`

### 2. Update Testimonials Data
Edit `src/data/testimonials.json` and add entries:

```json
{
  "id": "1",
  "name": "Priya Sharma",
  "course": "Fashion Designing",
  "videoType": "local",
  "videoUrl": "/videos/testimonial-1.mp4",
  "thumbnail": "/images/student-thumbnail-1.jpg",
  "quote": "Zahara gave me the confidence and skills to start my own boutique."
}
```

**For YouTube Videos:**
```json
{
  "id": "2",
  "name": "Aisha Khan",
  "course": "Nursing Course",
  "videoType": "youtube",
  "videoUrl": "",
  "youtubeId": "dQw4w9WgXcQ",
  "thumbnail": "/images/student-thumbnail-2.jpg",
  "quote": "The hands-on training prepared me perfectly for my hospital job."
}
```

## How to Add Events

### 1. Add Media Files
- **Images**: Place in `public/images/events/`
- **Videos**: Place in `public/videos/events/`

### 2. Update Events Data
Edit `src/data/events.json`:

**For Images:**
```json
{
  "id": "1",
  "title": "Annual Day Celebration 2026",
  "date": "2026-03-15",
  "mediaType": "image",
  "mediaUrl": "/images/events/annual-day-2026.jpg",
  "description": "Students showcasing their talents and achievements."
}
```

**For Local Videos:**
```json
{
  "id": "2",
  "title": "Workshop on Digital Skills",
  "date": "2026-02-20",
  "mediaType": "video",
  "mediaUrl": "/videos/events/workshop-feb-2026.mp4",
  "description": "Industry experts sharing knowledge with our students."
}
```

**For YouTube Videos:**
```json
{
  "id": "3",
  "title": "Fashion Show 2025",
  "date": "2025-12-10",
  "mediaType": "video",
  "mediaUrl": "",
  "youtubeId": "dQw4w9WgXcQ",
  "description": "Fashion designing students presenting their final collections."
}
```

## File Formats Supported

### Videos
- MP4 (recommended)
- WebM
- OGV

### Images
- JPG/JPEG
- PNG
- WebP

## Tips

1. **Video File Size**: Keep videos under 50MB for better loading times
2. **Image Resolution**: Use 1920x1080 for best quality
3. **Thumbnails**: Create custom thumbnails for better appearance before video plays
4. **Dates**: Use YYYY-MM-DD format (e.g., "2026-03-15")
5. **YouTube**: Get the video ID from the URL (e.g., youtube.com/watch?v=**dQw4w9WgXcQ**)

## Page Location

The Life at Zahara page is accessible at:
- **URL**: `/life-at-zahara`
- **Navigation**: Main menu → "Life at Zahara"
- **Homepage**: "Explore campus life" button in Life at Zahara section
