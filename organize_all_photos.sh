#!/bin/bash

# Hero - 24 diverse photos from all segments for the image wall
cp temp_photos/day_segment/PRS03111.jpg assets/recap/hero/1.jpg
cp temp_photos/day_segment/PRS03160.jpg assets/recap/hero/2.jpg
cp temp_photos/day_segment/PRS03181.jpg assets/recap/hero/3.jpg
cp temp_photos/day_segment/PRS03073.jpg assets/recap/hero/4.jpg
cp temp_photos/speakers/PRS03403.jpg assets/recap/hero/5.jpg
cp temp_photos/speakers/PRS03518.jpg assets/recap/hero/6.jpg
cp temp_photos/afterparty/PRS03824.jpg assets/recap/hero/7.jpg
cp temp_photos/afterparty/PRS03854.jpg assets/recap/hero/8.jpg
cp temp_photos/afterparty/PRS03871.jpg assets/recap/hero/9.jpg
cp temp_photos/investor_segment/PRS03676.jpg assets/recap/hero/10.jpg
cp temp_photos/investor_segment/PRS03694.jpg assets/recap/hero/11.jpg
cp temp_photos/day_segment/PRS03097.jpg assets/recap/hero/12.jpg
cp temp_photos/speakers/PRS03534.jpg assets/recap/hero/13.jpg
cp temp_photos/day_segment/PRS03223.jpg assets/recap/hero/14.jpg
cp temp_photos/afterparty/PRS03862.jpg assets/recap/hero/15.jpg
cp temp_photos/afterparty/PRS04130.jpg assets/recap/hero/16.jpg
cp temp_photos/investor_segment/PRS03701.jpg assets/recap/hero/17.jpg
cp temp_photos/day_segment/PRS03265.jpg assets/recap/hero/18.jpg
cp temp_photos/afterparty/PRS04235.jpg assets/recap/hero/19.jpg
cp temp_photos/investor_segment/PRS03720.jpg assets/recap/hero/20.jpg
cp temp_photos/speakers/PRS03555.jpg assets/recap/hero/21.jpg
cp temp_photos/afterparty/PRS04305.jpg assets/recap/hero/22.jpg
cp temp_photos/day_segment/PRS03269.jpg assets/recap/hero/23.jpg
cp temp_photos/afterparty/PRS04377.jpg assets/recap/hero/24.jpg

# Arrivals & mingling - use first 12 day_segment photos (arrivals, mingling)
idx=1
for photo in PRS03018.jpg PRS03051.jpg PRS03057.jpg PRS03071.jpg PRS03073.jpg PRS03097.jpg PRS03111.jpg PRS03122.jpg PRS03134.jpg PRS03138.jpg PRS03158.jpg PRS03160.jpg; do
  cp "temp_photos/day_segment/$photo" "assets/recap/arrivals-mingling/$idx.jpg"
  idx=$((idx+1))
done

# Opening - The 5 featured opening_*.jpg (when available) + rest of day_segment (13 photos)
# Placeholders for opening_1-5.jpg (will be added separately)
idx=6
for photo in PRS03181.jpg PRS03184.jpg PRS03193.jpg PRS03223.jpg PRS03226.jpg PRS03265.jpg PRS03269.jpg PRS03273.jpg PRS03294.jpg PRS03303.jpg PRS03347.jpg PRS03363.jpg PRS03371.jpg; do
  cp "temp_photos/day_segment/$photo" "assets/recap/opening/$idx.jpg"
  idx=$((idx+1))
done

# Keynote & Panel - ALL 21 speakers photos
idx=1
for photo in temp_photos/speakers/*.jpg; do
  cp "$photo" "assets/recap/keynote-panel/$idx.jpg"
  idx=$((idx+1))
done

# Investor conversations - ALL 26 photos
idx=1
for photo in temp_photos/investor_segment/*.jpg; do
  cp "$photo" "assets/recap/investor-conversations/$idx.jpg"
  idx=$((idx+1))
done

# After party - ALL 36 photos
idx=1
for photo in temp_photos/afterparty/*.jpg; do
  cp "$photo" "assets/recap/afterparty/$idx.jpg"
  idx=$((idx+1))
done

# Create placeholders for featured images
touch assets/recap/founder-message.jpg
touch assets/recap/team.jpg

echo "All photos organized!"
find assets/recap -name "*.jpg" -type f | wc -l
