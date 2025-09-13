/*
  # Add new columns to resolutions table

  1. New Columns
    - `with_ordinance` (boolean, default false)
      - Indicates whether the resolution is associated with an ordinance
    - `is_featured` (boolean, default false)
      - Indicates whether the resolution should be featured/highlighted

  2. Indexes
    - Add index on `is_featured` for efficient filtering of featured resolutions
    - Add index on `with_ordinance` for efficient filtering of ordinance-related resolutions

  3. Data Integrity
    - Both columns are NOT NULL with DEFAULT FALSE to preserve existing data
    - No impact on existing rows - all will automatically get FALSE values
*/

-- Add the 'with_ordinance' column
ALTER TABLE public.resolutions
ADD COLUMN with_ordinance BOOLEAN NOT NULL DEFAULT FALSE;

-- Add the 'is_featured' column
ALTER TABLE public.resolutions
ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT FALSE;

-- Create an index for 'is_featured' for efficient filtering
CREATE INDEX resolutions_is_featured_idx ON public.resolutions (is_featured);

-- Create an index for 'with_ordinance' for efficient filtering
CREATE INDEX resolutions_with_ordinance_idx ON public.resolutions (with_ordinance);

-- Create a composite index for featured resolutions ordered by date
CREATE INDEX resolutions_featured_date_idx ON public.resolutions (is_featured, date_approved DESC);