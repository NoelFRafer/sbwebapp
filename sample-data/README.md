# Sample Data for Supabase Import

This directory contains sample CSV files for importing data into the Sangguniang Bayan ng Capalonga website database.

## Files Included

1. **news_items.csv** - Sample news articles and announcements
2. **resolutions.csv** - Sample municipal resolutions and ordinances  
3. **slides.csv** - Sample carousel slides for vision, mission, and values

## Import Instructions

### Using Supabase Dashboard

1. Log into your Supabase project dashboard
2. Navigate to the Table Editor
3. Select the target table (news_items, resolutions, or slides)
4. Click "Insert" → "Import data from CSV"
5. Upload the corresponding CSV file
6. Map the columns correctly
7. Click "Import"

### Using SQL Commands

You can also import using SQL commands in the SQL Editor:

```sql
-- For news_items
COPY news_items(id, title, date, content, is_featured, is_priority, order_index)
FROM '/path/to/news_items.csv'
DELIMITER ','
CSV HEADER;

-- For resolutions  
COPY resolutions(id, resolution_number, title, date_approved, description, file_url, is_active, with_ordinance, is_featured)
FROM '/path/to/resolutions.csv'
DELIMITER ','
CSV HEADER;

-- For slides
COPY slides(id, image_url, thrust, quote, author, position, order_index, is_active)
FROM '/path/to/slides.csv'
DELIMITER ','
CSV HEADER;
```

## Data Details

### News Items (10 records)
- Realistic municipal news and announcements
- Dates from November 2024 to December 2024
- Mix of featured and regular news items
- All marked as priority items for display

### Resolutions (10 records)
- Municipal resolutions from 2024
- Mix of regular resolutions and those with ordinances
- Realistic resolution numbers and titles
- Sample file URLs (replace with actual document links)

### Slides (5 records)
- Vision, mission, and core values content
- Sample image paths (replace with actual image files)
- Proper ordering for carousel display
- All slides marked as active

## Important Notes

1. **UUIDs**: The sample data uses realistic UUID format. Supabase will auto-generate UUIDs if you omit the id column during import.

2. **Image URLs**: The slides CSV contains placeholder image paths. Make sure to:
   - Upload actual images to your `public/images/` directory
   - Update the image_url paths to match your actual files
   - Or use external image URLs

3. **File URLs**: The resolutions CSV contains example document URLs. Replace these with actual document links or remove the file_url column if not needed.

4. **Dates**: All dates are in YYYY-MM-DD format as required by PostgreSQL.

5. **Boolean Values**: Use `true`/`false` (lowercase) for boolean columns.

## Customization

Feel free to modify the sample data to match your municipality's actual:
- News and announcements
- Resolutions and ordinances  
- Vision, mission, and leadership information
- Local image assets and document links

## Validation

After importing, verify the data appears correctly in your application and that:
- Search functionality works with the imported content
- Images display properly in the carousel
- Document links are accessible
- Dates and formatting appear correctly