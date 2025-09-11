/*
  # Update slides to use local images

  1. Changes
    - Update existing slides to use local image paths instead of external URLs
    - This allows the application to use images stored in the public/images folder
  
  2. Notes
    - Images should be placed in the public/images folder
    - Paths are relative to the application root
*/

-- Update existing slides to use local image paths
UPDATE slides 
SET image_url = '/images/placeholder-1.jpg'
WHERE order_index = 0;

UPDATE slides 
SET image_url = '/images/placeholder-2.jpg'
WHERE order_index = 1;

UPDATE slides 
SET image_url = '/images/placeholder-3.jpg'
WHERE order_index = 2;

-- If you have more slides, you can add more UPDATE statements here
-- UPDATE slides 
-- SET image_url = '/images/your-image-name.jpg'
-- WHERE order_index = 3;