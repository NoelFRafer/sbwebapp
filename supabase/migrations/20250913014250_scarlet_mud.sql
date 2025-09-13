/*
  # Insert Sample Sangguniang Bayan Resolutions

  1. Sample Data
    - 10 realistic Sangguniang Bayan resolutions
    - Mix of featured and non-featured resolutions
    - Some with ordinances, some without
    - Various dates throughout 2024
    - Some with file URLs, some without

  2. Data Variety
    - Budget approvals
    - Business permits
    - Disaster management plans
    - Community recognition
    - Agricultural zoning
    - Youth empowerment
    - Environmental initiatives
    - Revenue code amendments
*/

INSERT INTO public.resolutions (resolution_number, title, date_approved, description, file_url, with_ordinance, is_featured) VALUES
('Res. No. 2024-001', 'Resolution Approving the Annual Budget for Fiscal Year 2024', '2024-01-15', 'A resolution approving the annual budget of the Municipality of Capalonga for the fiscal year 2024, appropriating funds for various municipal services and development projects including infrastructure, health services, education support, and social welfare programs.', 'https://example.com/resolutions/res2024-001.pdf', false, true),

('Res. No. 2024-002', 'Resolution Granting Business Permit to Capalonga Trading Corporation', '2024-01-22', 'A resolution granting a business permit to Capalonga Trading Corporation for the operation of a new retail establishment within the municipality, subject to compliance with all local ordinances, zoning regulations, and environmental requirements.', null, false, false),

('Res. No. 2024-003', 'Resolution Adopting the Local Disaster Risk Reduction and Management Plan', '2024-02-05', 'A resolution adopting the comprehensive Local Disaster Risk Reduction and Management Plan (LDRRMP) for the Municipality of Capalonga, ensuring preparedness and response to natural calamities including typhoons, floods, and earthquakes.', 'https://example.com/resolutions/res2024-003.pdf', true, true),

('Res. No. 2024-004', 'Resolution Commending Outstanding Local Athletes in Regional Sports Competition', '2024-02-19', 'A resolution commending local athletes who have brought honor and recognition to the municipality through their outstanding achievements in the recent Bicol Regional Athletic Association (BRAA) competitions, particularly in basketball, volleyball, and track and field events.', null, false, false),

('Res. No. 2024-005', 'Resolution Authorizing MOA with Bicol Development Foundation', '2024-03-04', 'A resolution authorizing the Municipal Mayor to enter into a Memorandum of Agreement (MOA) with Bicol Development Foundation for the implementation of a sustainable livelihood program benefiting marginalized families in the municipality.', 'https://example.com/resolutions/res2024-005.pdf', false, false),

('Res. No. 2024-006', 'Resolution Declaring Agricultural Protection Zone in Barangay San Jose', '2024-03-18', 'A resolution declaring a specific 50-hectare portion of Barangay San Jose as an agricultural protection zone to preserve prime agricultural land, promote food security, and protect the livelihood of local farmers engaged in rice and coconut production.', 'https://example.com/resolutions/res2024-006.pdf', true, false),

('Res. No. 2024-007', 'Resolution Approving Procurement of Municipal Service Vehicles', '2024-04-01', 'A resolution approving the procurement of new service vehicles for various municipal departments including the Municipal Health Office, Social Welfare Office, and Municipal Engineering Office to enhance public service delivery and emergency response capabilities.', null, false, false),

('Res. No. 2024-008', 'Resolution Establishing the Capalonga Municipal Youth Development Council', '2024-04-15', 'A resolution establishing the Capalonga Municipal Youth Development Council to empower the youth sector, promote their active participation in local governance, and implement programs addressing youth concerns including education, employment, and leadership development.', 'https://example.com/resolutions/res2024-008.pdf', true, true),

('Res. No. 2024-009', 'Resolution Supporting National Clean and Green Program', '2024-05-06', 'A resolution expressing full support for the National Clean and Green Program and encouraging community participation in maintaining cleanliness, proper waste segregation, and environmental conservation throughout all barangays in the municipality.', null, false, false),

('Res. No. 2024-010', 'Resolution Amending Municipal Revenue Code on Business Tax Rates', '2024-05-20', 'A resolution proposing amendments to the existing Municipal Revenue Code, specifically updating business tax rates and permit fees to align with current economic conditions while ensuring fair taxation and improved revenue collection efficiency for municipal operations.', 'https://example.com/resolutions/res2024-010.pdf', true, false);