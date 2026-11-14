#!/bin/bash

# Clear and recreate directories
rm -rf assets/recap
mkdir -p assets/recap/{hero,arrivals,mingling,opening,keynote,panel,investor-conversations,afterparty}

# Hero - 24 diverse photos from all segments
cp temp_photos/supernova_web/day_segment/PRS03111.jpg assets/recap/hero/1.jpg
cp temp_photos/supernova_web/day_segment/PRS03160.jpg assets/recap/hero/2.jpg
cp temp_photos/supernova_web/day_segment/PRS03181.jpg assets/recap/hero/3.jpg
cp temp_photos/supernova_web/day_segment/PRS03223.jpg assets/recap/hero/4.jpg
cp temp_photos/supernova_web/day_segment/PRS03097.jpg assets/recap/hero/5.jpg
cp temp_photos/supernova_web/day_segment/PRS03073.jpg assets/recap/hero/6.jpg
cp temp_photos/supernova_web/afterparty/PRS03824.jpg assets/recap/hero/7.jpg
cp temp_photos/supernova_web/afterparty/PRS03854.jpg assets/recap/hero/8.jpg
cp temp_photos/supernova_web/afterparty/PRS03871.jpg assets/recap/hero/9.jpg
cp temp_photos/supernova_web/investor_segment/PRS03676.jpg assets/recap/hero/10.jpg
cp temp_photos/supernova_web/investor_segment/PRS03694.jpg assets/recap/hero/11.jpg
cp temp_photos/supernova_web/speakers/PRS03403.jpg assets/recap/hero/12.jpg
cp temp_photos/supernova_web/speakers/PRS03534.jpg assets/recap/hero/13.jpg
cp temp_photos/supernova_web/day_segment/PRS03047.jpg assets/recap/hero/14.jpg
cp temp_photos/supernova_web/day_segment/PRS03265.jpg assets/recap/hero/15.jpg
cp temp_photos/supernova_web/afterparty/PRS03862.jpg assets/recap/hero/16.jpg
cp temp_photos/supernova_web/afterparty/PRS03883.jpg assets/recap/hero/17.jpg
cp temp_photos/supernova_web/investor_segment/PRS03701.jpg assets/recap/hero/18.jpg
cp temp_photos/supernova_web/day_segment/PRS03303.jpg assets/recap/hero/19.jpg
cp temp_photos/supernova_web/day_segment/1.jpg assets/recap/hero/20.jpg
cp temp_photos/supernova_web/afterparty/PRS04130.jpg assets/recap/hero/21.jpg
cp temp_photos/supernova_web/investor_segment/PRS03720.jpg assets/recap/hero/22.jpg
cp temp_photos/supernova_web/speakers/PRS03518.jpg assets/recap/hero/23.jpg
cp temp_photos/supernova_web/afterparty/PRS04235.jpg assets/recap/hero/24.jpg

# Arrivals - 8 photos with people
cp temp_photos/supernova_web/day_segment/PRS03018.jpg assets/recap/arrivals/1.jpg
cp temp_photos/supernova_web/day_segment/PRS03021.jpg assets/recap/arrivals/2.jpg
cp temp_photos/supernova_web/day_segment/PRS03047.jpg assets/recap/arrivals/3.jpg
cp temp_photos/supernova_web/day_segment/PRS03051.jpg assets/recap/arrivals/4.jpg
cp temp_photos/supernova_web/day_segment/PRS03057.jpg assets/recap/arrivals/5.jpg
cp temp_photos/supernova_web/day_segment/PRS03071.jpg assets/recap/arrivals/6.jpg
cp temp_photos/supernova_web/day_segment/PRS03073.jpg assets/recap/arrivals/7.jpg
cp temp_photos/supernova_web/day_segment/PRS03097.jpg assets/recap/arrivals/8.jpg

# Mingling - 10 photos
cp temp_photos/supernova_web/day_segment/PRS03097.jpg assets/recap/mingling/1.jpg
cp temp_photos/supernova_web/day_segment/PRS03111.jpg assets/recap/mingling/2.jpg
cp temp_photos/supernova_web/day_segment/PRS03122.jpg assets/recap/mingling/3.jpg
cp temp_photos/supernova_web/day_segment/PRS03134.jpg assets/recap/mingling/4.jpg
cp temp_photos/supernova_web/day_segment/PRS03138.jpg assets/recap/mingling/5.jpg
cp temp_photos/supernova_web/day_segment/PRS03158.jpg assets/recap/mingling/6.jpg
cp temp_photos/supernova_web/day_segment/PRS03160.jpg assets/recap/mingling/7.jpg
cp temp_photos/supernova_web/day_segment/PRS03181.jpg assets/recap/mingling/8.jpg
cp temp_photos/supernova_web/day_segment/PRS03193.jpg assets/recap/mingling/9.jpg
cp temp_photos/supernova_web/day_segment/PRS03223.jpg assets/recap/mingling/10.jpg

# Opening - Keep the 4 featured photos + add more from day_segment (Manasa at backdrop)
# Featured photos are already there, add supporting shots
cp temp_photos/supernova_web/day_segment/PRS03371.jpg assets/recap/opening/5.jpg
cp temp_photos/supernova_web/day_segment/PRS03386.jpg assets/recap/opening/6.jpg
cp temp_photos/supernova_web/day_segment/PRS03415.jpg assets/recap/opening/7.jpg
cp temp_photos/supernova_web/day_segment/PRS03422.jpg assets/recap/opening/8.jpg
cp temp_photos/supernova_web/day_segment/PRS03429.jpg assets/recap/opening/9.jpg
cp temp_photos/supernova_web/day_segment/PRS03435.jpg assets/recap/opening/10.jpg
cp temp_photos/supernova_web/day_segment/PRS03440.jpg assets/recap/opening/11.jpg
cp temp_photos/supernova_web/day_segment/PRS03443.jpg assets/recap/opening/12.jpg

# Keynote - Revathi in white - 10 photos
cp temp_photos/supernova_web/speakers/PRS03518.jpg assets/recap/keynote/1.jpg
cp temp_photos/supernova_web/speakers/PRS03534.jpg assets/recap/keynote/2.jpg
cp temp_photos/supernova_web/speakers/PRS03555.jpg assets/recap/keynote/3.jpg
cp temp_photos/supernova_web/speakers/PRS03559.jpg assets/recap/keynote/4.jpg
cp temp_photos/supernova_web/speakers/PRS03566.jpg assets/recap/keynote/5.jpg
cp temp_photos/supernova_web/speakers/PRS03573.jpg assets/recap/keynote/6.jpg
cp temp_photos/supernova_web/speakers/PRS03579.jpg assets/recap/keynote/7.jpg
cp temp_photos/supernova_web/speakers/PRS03583.jpg assets/recap/keynote/8.jpg
cp temp_photos/supernova_web/speakers/PRS03594.jpg assets/recap/keynote/9.jpg
cp temp_photos/supernova_web/speakers/PRS03598.jpg assets/recap/keynote/10.jpg

# Panel - 10 photos
cp temp_photos/supernova_web/speakers/PRS03403.jpg assets/recap/panel/1.jpg
cp temp_photos/supernova_web/speakers/PRS03404.jpg assets/recap/panel/2.jpg
cp temp_photos/supernova_web/speakers/PRS03426.jpg assets/recap/panel/3.jpg
cp temp_photos/supernova_web/speakers/PRS03432.jpg assets/recap/panel/4.jpg
cp temp_photos/supernova_web/speakers/PRS03448.jpg assets/recap/panel/5.jpg
cp temp_photos/supernova_web/speakers/PRS03500.jpg assets/recap/panel/6.jpg
cp temp_photos/supernova_web/speakers/PRS03607.jpg assets/recap/panel/7.jpg
cp temp_photos/supernova_web/speakers/PRS03611.jpg assets/recap/panel/8.jpg
cp temp_photos/supernova_web/speakers/PRS03614.jpg assets/recap/panel/9.jpg
cp temp_photos/supernova_web/speakers/PRS03581.jpg assets/recap/panel/10.jpg

# Investor conversations - 20 photos
cp temp_photos/supernova_web/investor_segment/PRS03676.jpg assets/recap/investor-conversations/1.jpg
cp temp_photos/supernova_web/investor_segment/PRS03679.jpg assets/recap/investor-conversations/2.jpg
cp temp_photos/supernova_web/investor_segment/PRS03686.jpg assets/recap/investor-conversations/3.jpg
cp temp_photos/supernova_web/investor_segment/PRS03692.jpg assets/recap/investor-conversations/4.jpg
cp temp_photos/supernova_web/investor_segment/PRS03694.jpg assets/recap/investor-conversations/5.jpg
cp temp_photos/supernova_web/investor_segment/PRS03697.jpg assets/recap/investor-conversations/6.jpg
cp temp_photos/supernova_web/investor_segment/PRS03701.jpg assets/recap/investor-conversations/7.jpg
cp temp_photos/supernova_web/investor_segment/PRS03705.jpg assets/recap/investor-conversations/8.jpg
cp temp_photos/supernova_web/investor_segment/PRS03719.jpg assets/recap/investor-conversations/9.jpg
cp temp_photos/supernova_web/investor_segment/PRS03720.jpg assets/recap/investor-conversations/10.jpg
cp temp_photos/supernova_web/investor_segment/PRS03723.jpg assets/recap/investor-conversations/11.jpg
cp temp_photos/supernova_web/investor_segment/PRS03725.jpg assets/recap/investor-conversations/12.jpg
cp temp_photos/supernova_web/investor_segment/PRS03739.jpg assets/recap/investor-conversations/13.jpg
cp temp_photos/supernova_web/investor_segment/PRS03744.jpg assets/recap/investor-conversations/14.jpg
cp temp_photos/supernova_web/investor_segment/PRS03746.jpg assets/recap/investor-conversations/15.jpg
cp temp_photos/supernova_web/investor_segment/PRS03763.jpg assets/recap/investor-conversations/16.jpg
cp temp_photos/supernova_web/investor_segment/PRS03769.jpg assets/recap/investor-conversations/17.jpg
cp temp_photos/supernova_web/investor_segment/PRS03775.jpg assets/recap/investor-conversations/18.jpg
cp temp_photos/supernova_web/investor_segment/PRS03807.jpg assets/recap/investor-conversations/19.jpg
cp temp_photos/supernova_web/investor_segment/PRS03814.jpg assets/recap/investor-conversations/20.jpg

# After party - 30 photos (the best from 44)
cp temp_photos/supernova_web/afterparty/PRS03824.jpg assets/recap/afterparty/1.jpg
cp temp_photos/supernova_web/afterparty/PRS03826.jpg assets/recap/afterparty/2.jpg
cp temp_photos/supernova_web/afterparty/PRS03854.jpg assets/recap/afterparty/3.jpg
cp temp_photos/supernova_web/afterparty/PRS03856.jpg assets/recap/afterparty/4.jpg
cp temp_photos/supernova_web/afterparty/PRS03862.jpg assets/recap/afterparty/5.jpg
cp temp_photos/supernova_web/afterparty/PRS03866.jpg assets/recap/afterparty/6.jpg
cp temp_photos/supernova_web/afterparty/PRS03869.jpg assets/recap/afterparty/7.jpg
cp temp_photos/supernova_web/afterparty/PRS03871.jpg assets/recap/afterparty/8.jpg
cp temp_photos/supernova_web/afterparty/PRS03883.jpg assets/recap/afterparty/9.jpg
cp temp_photos/supernova_web/afterparty/PRS04015.jpg assets/recap/afterparty/10.jpg
cp temp_photos/supernova_web/afterparty/PRS04022.jpg assets/recap/afterparty/11.jpg
cp temp_photos/supernova_web/afterparty/PRS04041.jpg assets/recap/afterparty/12.jpg
cp temp_photos/supernova_web/afterparty/PRS04070.jpg assets/recap/afterparty/13.jpg
cp temp_photos/supernova_web/afterparty/PRS04079.jpg assets/recap/afterparty/14.jpg
cp temp_photos/supernova_web/afterparty/PRS04130.jpg assets/recap/afterparty/15.jpg
cp temp_photos/supernova_web/afterparty/PRS04169.jpg assets/recap/afterparty/16.jpg
cp temp_photos/supernova_web/afterparty/PRS04235.jpg assets/recap/afterparty/17.jpg
cp temp_photos/supernova_web/afterparty/PRS04242.jpg assets/recap/afterparty/18.jpg
cp temp_photos/supernova_web/afterparty/PRS04245.jpg assets/recap/afterparty/19.jpg
cp temp_photos/supernova_web/afterparty/PRS04255.jpg assets/recap/afterparty/20.jpg
cp temp_photos/supernova_web/afterparty/PRS04277.jpg assets/recap/afterparty/21.jpg
cp temp_photos/supernova_web/afterparty/PRS04305.jpg assets/recap/afterparty/22.jpg
cp temp_photos/supernova_web/afterparty/PRS04308.jpg assets/recap/afterparty/23.jpg
cp temp_photos/supernova_web/afterparty/PRS04347.jpg assets/recap/afterparty/24.jpg
cp temp_photos/supernova_web/afterparty/PRS04348.jpg assets/recap/afterparty/25.jpg
cp temp_photos/supernova_web/afterparty/PRS04357.jpg assets/recap/afterparty/26.jpg
cp temp_photos/supernova_web/afterparty/PRS04377.jpg assets/recap/afterparty/27.jpg
cp temp_photos/supernova_web/afterparty/PRS04384.jpg assets/recap/afterparty/28.jpg
cp temp_photos/supernova_web/afterparty/PRS04460.jpg assets/recap/afterparty/29.jpg
cp temp_photos/supernova_web/afterparty/PRS04535.jpg assets/recap/afterparty/30.jpg

# Copy team photo
cp assets/recap/team.jpg assets/recap/team-backup.jpg 2>/dev/null || true

echo "Photo curation complete!"
find assets/recap -type f -name "*.jpg" | wc -l
