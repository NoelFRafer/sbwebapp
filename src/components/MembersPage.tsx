import React from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  Star,
  Award,
  Building,
  User
} from 'lucide-react';

interface MembersPageProps {
  onBack: () => void;
  onMemberClick?: (memberId: string) => void;
}

interface Member {
  id: string;
  name: string;
  title: string;
  position: string;
  image: string;
  committees: string[];
  leadership: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  biography: string;
  termStart: string;
  termEnd: string;
  isLeadership: boolean;
}

const members: Member[] = [
  {
    id: 'vice-mayor',
    name: 'Hon. Atty. Marsha B. Esturas',
    title: 'Vice Mayor',
    position: 'Presiding Officer',
    image: '/images/mbesturas.jpg',
    committees: ['Presiding Officer of all Committees'],
    leadership: ['Presiding Officer of the Sangguniang Bayan'],
    contact: {
      phone: '(054) 123-4567',
      email: 'vmayor.capalonga@gmail.com'
    },
    biography: 'A dedicated public servant with extensive legal background, Hon. Atty. Marsha B. Esturas brings years of experience in local governance and community development. She is committed to transparent and responsive leadership, focusing on sustainable development and social justice initiatives for the municipality of Capalonga.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'portugal',
    name: 'Hon. Caroline O. Portugal',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Appropriations & Ways and Means', 'Agriculture, Food, Fisheries, and Aquatic Resources', 'Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment', 'Education', 'Tourism, Culture & Arts', 'Public Market and Slaughter House', 'Social Services', 'Health and Sanitation', 'Peace and Order and Human Rights'],
    leadership: ['Chairperson - Appropriations & Ways and Means'],
    contact: {
      phone: '(054) 123-4568'
    },
    biography: 'Hon. Caroline O. Portugal is a passionate advocate for public health and women\'s rights. With extensive experience in budget management and community health programs, she chairs the crucial Appropriations & Ways and Means committee and serves on multiple committees focused on community welfare.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'malaluan-iv',
    name: 'Hon. Abel P. Malaluan, IV',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Infrastructure, Housing, Land Utilization, and Environmental Protection', 'Agriculture, Food, Fisheries, and Aquatic Resources', 'Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment', 'Tourism, Culture & Arts', 'Games and Amusements', 'Good Government and Public Accountability', 'Youth and Sports Development', 'Ethics, Rules, and Privileges', 'Transportation, Communication, Public Utilities, Facilities, and Information Technology', 'Women, Children, and Family Welfare'],
    leadership: ['Chairperson - Infrastructure, Housing, Land Utilization, and Environmental Protection'],
    contact: {
      phone: '(054) 123-4569'
    },
    biography: 'A strong advocate for sustainable development and environmental protection, Hon. Abel P. Malaluan, IV leads infrastructure development while ensuring environmental sustainability. He serves on multiple committees focusing on community development and governance.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'enero',
    name: 'Hon. Juan P. Enero',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: '/images/jpenero.jpg',
    committees: ['Health and Sanitation', 'Disaster Risk Reduction Management', 'Barangay Affairs', 'Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment', 'Education', 'Good Government and Public Accountability', 'Youth and Sports Development', 'Public Market and Slaughter House', 'Ordinances and Legal Matters', 'Transportation, Communication, Public Utilities, Facilities, and Information Technology'],
    leadership: ['Chairperson - Health and Sanitation', 'Chairperson - Disaster Risk Reduction Management'],
    contact: {
      phone: '(054) 123-4570'
    },
    biography: 'With extensive experience in public health and disaster management, Hon. Juan P. Enero leads critical committees focused on community health and safety. His expertise ensures effective emergency preparedness and quality healthcare services for all residents.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'malaluan-elmer',
    name: 'Hon. Elmer M. Malaluan',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment', 'Games and Amusements', 'Peace and Order and Human Rights', 'Transportation, Communication, Public Utilities, Facilities, and Information Technology', 'Agriculture, Food, Fisheries, and Aquatic Resources', 'Barangay Affairs', 'Appropriations & Ways and Means', 'Public Market and Slaughter House', 'Social Services', 'Women, Children, and Family Welfare'],
    leadership: ['Chairperson - Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment', 'Chairperson - Games and Amusements', 'Chairperson - Peace and Order and Human Rights'],
    contact: {
      phone: '(054) 123-4571'
    },
    biography: 'Hon. Elmer M. Malaluan is a versatile leader dedicated to economic development, peace and order, and community empowerment. He chairs multiple committees focusing on cooperatives, public safety, and recreational activities that benefit all residents of Capalonga.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'ricasio',
    name: 'Hon. Robinson E. Ricasio',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Education', 'Agriculture, Food, Fisheries, and Aquatic Resources', 'Tourism, Culture & Arts', 'Youth and Sports Development', 'Ordinances and Legal Matters'],
    leadership: ['Chairperson - Education'],
    contact: {
      phone: '(054) 123-4572'
    },
    biography: 'An education advocate and community leader, Hon. Robinson E. Ricasio focuses on improving educational opportunities and youth development. He works to enhance learning facilities and create programs that benefit students and educators in Capalonga.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'parale',
    name: 'Hon. Jumaro R. Parale',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Tourism, Culture & Arts', 'Social Services', 'Ordinances and Legal Matters', 'Women, Children, and Family Welfare', 'Disaster Risk Reduction Management', 'Education', 'Appropriations & Ways and Means', 'Infrastructure, Housing, Land Utilization, and Environmental Protection', 'Good Government and Public Accountability', 'Ethics, Rules, and Privileges'],
    leadership: ['Chairperson - Tourism, Culture & Arts', 'Chairperson - Social Services', 'Chairperson - Ordinances and Legal Matters'],
    contact: {
      phone: '(054) 123-4573'
    },
    biography: 'Hon. Jumaro R. Parale is a dynamic leader committed to cultural preservation, social welfare, and legal governance. He chairs multiple committees focusing on tourism development, social services, and legal matters that enhance community life.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'arguelles',
    name: 'Hon. Mariano L. Arguelles',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Good Government and Public Accountability', 'Ethics, Rules, and Privileges', 'Transportation, Communication, Public Utilities, Facilities, and Information Technology', 'Barangay Affairs', 'Tourism, Culture & Arts', 'Appropriations & Ways and Means', 'Infrastructure, Housing, Land Utilization, and Environmental Protection', 'Youth and Sports Development', 'Social Services', 'Health and Sanitation', 'Public Market and Slaughter House', 'Ordinances and Legal Matters', 'Peace and Order and Human Rights', 'Women, Children, and Family Welfare', 'Disaster Risk Reduction Management'],
    leadership: ['Chairperson - Good Government and Public Accountability', 'Chairperson - Ethics, Rules, and Privileges', 'Chairperson - Transportation, Communication, Public Utilities, Facilities, and Information Technology'],
    contact: {
      phone: '(054) 123-4574'
    },
    biography: 'Hon. Mariano L. Arguelles is a dedicated advocate for good governance and public accountability. He chairs multiple committees focusing on ethical governance, transportation, and serves on nearly every committee, demonstrating his commitment to comprehensive public service.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'vigonte-mena',
    name: 'Hon. Arlene V. Mena',
    title: 'Councilor',
    position: 'Committee Chairperson',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Agriculture, Food, Fisheries, and Aquatic Resources', 'Public Market and Slaughter House', 'Women, Children, and Family Welfare', 'Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment', 'Appropriations & Ways and Means', 'Good Government and Public Accountability', 'Infrastructure, Housing, Land Utilization, and Environmental Protection', 'Peace and Order and Human Rights', 'Ordinances and Legal Matters', 'Transportation, Communication, Public Utilities, Facilities, and Information Technology', 'Disaster Risk Reduction Management'],
    leadership: ['Chairperson - Agriculture, Food, Fisheries, and Aquatic Resources', 'Chairperson - Public Market and Slaughter House', 'Chairperson - Women, Children, and Family Welfare'],
    contact: {
      phone: '(054) 123-4575'
    },
    biography: 'Hon. Arlene V. Mena is a passionate advocate for agriculture, women\'s rights, and family welfare. She leads multiple committees focusing on food security, market development, and the protection of women and children in the community.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'esturas-leslie',
    name: 'Hon. Leslie B. Esturas',
    title: 'Liga ng mga Barangay President',
    position: 'Ex-Officio Member',
    image: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Barangay Affairs', 'Games and Amusements', 'Social Services', 'Health and Sanitation', 'Ethics, Rules, and Privileges', 'Peace and Order and Human Rights', 'Disaster Risk Reduction Management'],
    leadership: ['Liga ng mga Barangay President', 'Chairperson - Barangay Affairs'],
    contact: {
      phone: '(054) 123-4576'
    },
    biography: 'As the Liga ng mga Barangay President, Hon. Leslie B. Esturas represents the interests of all barangay officials in the municipality. He ensures effective coordination between the municipal government and barangay units.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  },
  {
    id: 'talento',
    name: 'Hon. John Ernie M. Talento',
    title: 'Sangguniang Kabataan Federation President',
    position: 'Ex-Officio Member',
    image: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=400',
    committees: ['Youth and Sports Development', 'Barangay Affairs', 'Education', 'Games and Amusements', 'Infrastructure, Housing, Land Utilization, and Environmental Protection', 'Health and Sanitation', 'Ethics, Rules, and Privileges'],
    leadership: ['Sangguniang Kabataan Federation President', 'Chairperson - Youth and Sports Development'],
    contact: {
      phone: '(054) 123-4577'
    },
    biography: 'Hon. John Ernie M. Talento represents the voice of the youth in the Sangguniang Bayan. As SKF President, he advocates for youth development programs, sports initiatives, and educational opportunities for young people in Capalonga.',
    termStart: '2025-06-30',
    termEnd: '2028-06-30',
    isLeadership: true
  }
];

export function MembersPage({ onBack, onMemberClick }: MembersPageProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Separate leadership and regular members
  const leadershipMembers = members.filter(member => member.isLeadership);
  const regularMembers = members.filter(member => !member.isLeadership);

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sangguniang Bayan Members</h1>
              <p className="text-lg text-gray-600">Municipality of Capalonga</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated public servants who represent the interests of Capalonga's constituents 
            and work tirelessly to promote the welfare and development of our municipality.
          </p>
        </div>
      </div>

      {/* Council Leadership Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Council Leadership</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onMemberClick?.(member.id)}
            >
              {/* Member Photo */}
              <div className="relative h-64 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
                    <Award className="w-3 h-3 mr-1" />
                    Leadership
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold">{member.title}</p>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>

                {/* Leadership Roles */}
                {member.leadership.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Leadership Roles:</h4>
                    <div className="space-y-1">
                      {member.leadership.map((role, index) => (
                        <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mr-1 mb-1">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Committees */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Committee Assignments:</h4>
                  <div className="space-y-1">
                    {member.committees.map((committee, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mr-1 mb-1">
                        {committee}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4 space-y-2">
                  {member.contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.contact.phone}</span>
                    </div>
                  )}
                  {member.contact.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.contact.email}</span>
                    </div>
                  )}
                </div>

                {/* Biography */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {member.biography}
                  </p>
                </div>

                {/* Term */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Term: {formatDate(member.termStart)} - {formatDate(member.termEnd)}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regular Council Members Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Council Members</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onMemberClick?.(member.id)}
            >
              {/* Member Photo */}
              <div className="relative h-64 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold">{member.title}</p>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>

                {/* Committees */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Committee Assignments:</h4>
                  <div className="space-y-1">
                    {member.committees.map((committee, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mr-1 mb-1">
                        {committee}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4 space-y-2">
                  {member.contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.contact.phone}</span>
                    </div>
                  )}
                  {member.contact.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.contact.email}</span>
                    </div>
                  )}
                </div>

                {/* Biography */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {member.biography}
                  </p>
                </div>

                {/* Term */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Term: {formatDate(member.termStart)} - {formatDate(member.termEnd)}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-slate-800 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact the Sangguniang Bayan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Office Location */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Office Location</h3>
            <p className="text-blue-200">
              Municipal Hall<br />
              Capalonga, Camarines Norte<br />
              Philippines
            </p>
          </div>

          {/* Office Hours */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
            <p className="text-blue-200">
              Monday - Friday<br />
              8:00 AM - 5:00 PM<br />
              (Closed on holidays)
            </p>
          </div>

          {/* Session Schedule */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Regular Sessions</h3>
            <p className="text-blue-200">
              Every Tuesday<br />
              2:00 PM<br />
              Session Hall, Municipal Hall
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">How to Contact Your Representatives</h3>
          <div className="text-sm text-blue-100 space-y-2">
            <p>• <strong>For general inquiries:</strong> Visit the Municipal Hall during office hours</p>
            <p>• <strong>For committee matters:</strong> Contact the respective committee chairperson</p>
            <p>• <strong>For urgent concerns:</strong> Call the main office at (054) 123-4567</p>
            <p>• <strong>Public participation:</strong> Attend regular sessions every Tuesday at 2:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}