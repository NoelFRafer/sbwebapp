/*
  # Add Sample News Items for Pagination Testing

  1. Purpose
    - Add 20 diverse news items to test pagination functionality
    - Ensure varied dates, categories, and content types
    - Test search functionality with different keywords

  2. Content Structure
    - Realistic headlines (10-15 words each)
    - Brief summaries (50-100 words each)
    - Recent publication dates (last 30 days)
    - Diverse categories and topics
    - Professional, appropriate content
*/

INSERT INTO news_items (title, date, content, is_featured, is_priority, order_index) VALUES
(
  'Local Government Announces New Infrastructure Development Plan for Rural Communities',
  '2025-01-15',
  'The municipal government unveiled an ambitious infrastructure development plan aimed at improving road networks, water systems, and telecommunications in rural barangays. The comprehensive program will span three years and includes partnerships with private contractors. Mayor Rodriguez emphasized the project''s importance for economic growth and improved quality of life for residents in remote areas.',
  true,
  true,
  1
),
(
  'Capalonga Elementary School Wins Regional Science Fair Competition for Third Consecutive Year',
  '2025-01-14',
  'Students from Capalonga Elementary School dominated the regional science fair, taking home first place in multiple categories. The winning projects focused on environmental conservation and renewable energy solutions. Principal Santos credited the school''s dedicated science teachers and improved laboratory facilities for the continued success in academic competitions.',
  false,
  true,
  2
),
(
  'New Healthcare Clinic Opens to Serve Growing Population in Northern Districts',
  '2025-01-13',
  'A state-of-the-art healthcare facility opened its doors to residents of the northern districts, addressing the growing medical needs of the expanding population. The clinic features modern diagnostic equipment and will be staffed by qualified medical professionals. Health officials expect the facility to serve over 5,000 residents in its first year of operation.',
  true,
  true,
  3
),
(
  'Local Farmers Adopt Sustainable Agriculture Practices to Boost Crop Yields and Income',
  '2025-01-12',
  'Agricultural extension workers report significant success in promoting sustainable farming techniques among local farmers. The new methods have resulted in 30% higher crop yields while reducing environmental impact. Farmer cooperatives are now sharing knowledge and resources to implement organic fertilizers and water-efficient irrigation systems across the region.',
  false,
  true,
  4
),
(
  'Tourism Board Launches Digital Marketing Campaign to Attract More Visitors This Season',
  '2025-01-11',
  'The provincial tourism board unveiled a comprehensive digital marketing strategy to showcase local attractions and cultural heritage sites. The campaign includes social media promotions, virtual tours, and partnerships with travel bloggers. Tourism officials project a 25% increase in visitor arrivals during the upcoming peak season.',
  false,
  true,
  5
),
(
  'Community Volunteers Complete Coastal Cleanup Drive Removing Over 2 Tons of Waste',
  '2025-01-10',
  'Environmental advocates and community volunteers successfully completed a massive coastal cleanup operation, collecting more than 2 tons of plastic waste and debris. The initiative involved 200 participants from various barangays and local organizations. Environmental groups plan to make this a monthly activity to preserve marine ecosystems and promote environmental awareness.',
  false,
  true,
  6
),
(
  'Small Business Owners Report Increased Sales Following New Economic Support Programs',
  '2025-01-09',
  'Local entrepreneurs are experiencing significant business growth after participating in government-sponsored economic support programs. The initiatives include low-interest loans, business training workshops, and market access facilitation. Chamber of Commerce data shows a 40% increase in small business registrations and improved revenue streams for existing enterprises.',
  false,
  true,
  7
),
(
  'Public Transportation System Upgrades Include New Routes and Modern Vehicle Fleet',
  '2025-01-08',
  'The municipal transportation office announced major improvements to public transit services, including expanded routes and a fleet of modern, eco-friendly vehicles. The upgrades aim to reduce traffic congestion and provide reliable transportation options for commuters. New GPS tracking systems will allow passengers to monitor bus schedules in real-time.',
  false,
  true,
  8
),
(
  'Youth Sports League Championship Finals Draw Record Attendance from Enthusiastic Fans',
  '2025-01-07',
  'The annual youth sports league championship attracted over 3,000 spectators, marking the highest attendance in the event''s history. Young athletes competed in basketball, volleyball, and football tournaments representing their respective barangays. Sports officials praised the exceptional talent displayed and announced plans to expand the league to include more sports disciplines.',
  false,
  true,
  9
),
(
  'Cultural Festival Celebrates Local Heritage with Traditional Music Dance and Cuisine',
  '2025-01-06',
  'The three-day cultural festival showcased the rich heritage of the region through traditional performances, local cuisine, and artisan crafts. Thousands of visitors enjoyed folk dances, live music, and authentic regional dishes prepared by local cooks. Cultural preservation advocates emphasized the importance of passing these traditions to younger generations.',
  true,
  true,
  10
),
(
  'Emergency Response Team Conducts Disaster Preparedness Training for Barangay Officials',
  '2025-01-05',
  'Local emergency response units conducted comprehensive disaster preparedness training for barangay officials and community leaders. The program covered evacuation procedures, emergency communication protocols, and first aid techniques. Participants received certification and emergency supply kits to improve their communities'' readiness for natural disasters and other emergencies.',
  false,
  true,
  11
),
(
  'Technology Center Opens Computer Literacy Classes for Senior Citizens and Adults',
  '2025-01-04',
  'A new community technology center began offering computer literacy programs specifically designed for senior citizens and adults seeking to improve their digital skills. The classes cover basic computer operations, internet usage, and digital communication tools. Program coordinators report high enrollment and positive feedback from participants eager to bridge the digital divide.',
  false,
  true,
  12
),
(
  'Local Library Expands Services with Digital Resources and Extended Operating Hours',
  '2025-01-03',
  'The municipal library unveiled expanded services including digital book collections, online research databases, and extended evening hours to better serve the community. New computer workstations and high-speed internet access support students and professionals. Library officials report a 50% increase in daily visitors since implementing the improvements.',
  false,
  true,
  13
),
(
  'Water Conservation Project Successfully Reduces Consumption by 20 Percent Across Municipality',
  '2025-01-02',
  'A comprehensive water conservation initiative achieved remarkable results, reducing municipal water consumption by 20% through community education and infrastructure improvements. The project included leak detection programs, efficient irrigation systems, and public awareness campaigns. Water utility officials plan to expand the program to neighboring municipalities.',
  false,
  true,
  14
),
(
  'Renewable Energy Initiative Installs Solar Panels on Government Buildings and Schools',
  '2025-01-01',
  'The municipal government completed installation of solar panel systems on key government buildings and public schools as part of a renewable energy initiative. The project is expected to reduce electricity costs by 35% annually while promoting environmental sustainability. Energy officials are exploring additional renewable energy projects for the coming year.',
  false,
  true,
  15
),
(
  'Community Garden Project Provides Fresh Produce and Promotes Healthy Eating Habits',
  '2024-12-31',
  'Residents of several barangays successfully established community gardens that now provide fresh vegetables and promote healthy eating habits among families. The initiative includes educational workshops on nutrition and sustainable gardening practices. Health officials report improved dietary habits and increased consumption of locally grown produce in participating communities.',
  false,
  true,
  16
),
(
  'Skills Training Program Graduates 150 Participants Ready for Employment Opportunities',
  '2024-12-30',
  'A comprehensive skills training program celebrated the graduation of 150 participants who completed courses in various technical and vocational fields. The program included training in electronics, automotive repair, food service, and computer programming. Employment placement services report that 80% of graduates have secured jobs or started their own businesses.',
  false,
  true,
  17
),
(
  'Road Safety Campaign Reduces Traffic Accidents by 30 Percent in High Risk Areas',
  '2024-12-29',
  'An intensive road safety campaign successfully reduced traffic accidents by 30% in previously high-risk areas through improved signage, speed bumps, and public education. The initiative involved collaboration between traffic enforcers, schools, and community organizations. Safety officials plan to implement similar measures in additional locations throughout the municipality.',
  false,
  true,
  18
),
(
  'Senior Citizens Center Launches Health and Wellness Programs for Elderly Residents',
  '2024-12-28',
  'The newly renovated senior citizens center introduced comprehensive health and wellness programs designed specifically for elderly residents. Services include regular health screenings, exercise classes, social activities, and nutritional counseling. Healthcare providers report improved physical and mental health outcomes among program participants.',
  false,
  true,
  19
),
(
  'Environmental Protection Campaign Successfully Plants 5000 Trees in Reforestation Effort',
  '2024-12-27',
  'Environmental groups and volunteers completed an ambitious reforestation project, planting 5,000 native trees across degraded forest areas. The campaign involved students, community organizations, and government agencies working together to restore natural habitats. Environmental scientists expect the new forest growth to improve air quality and prevent soil erosion in the region.',
  true,
  true,
  20
);