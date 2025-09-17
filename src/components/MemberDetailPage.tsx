import React from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar,
  User,
  Award,
  Crown,
  UserCheck,
  Building,
  Clock,
  MapPin
} from 'lucide-react';

interface MemberDetailPageProps {
  memberId: string;
  onBack: () => void;
}

interface CommitteeMember {
  name: string;
  role: 'Chairman' | 'Vice Chairman' | 'First Member' | 'Second Member' | 'Third Member';
}

interface Committee {
  id: string;
  name: string;
  members: CommitteeMember[];
  description: string;
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
  achievements?: string[];
  education?: string[];
  experience?: string[];
}

// Member data (same as in MembersPage but with additional details)
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
    isLeadership: true,
    achievements: [
      'Established the Municipal Legal Aid Office',
      'Implemented transparency measures in council proceedings',
      'Led the development of the Municipal Code revision',
      'Championed women\'s rights advocacy programs'
    ],
    education: [
      'Juris Doctor, University of Nueva Caceres',
      'Bachelor of Arts in Political Science, Ateneo de Naga University'
    ],
    experience: [
      'Private Law Practice (2015-2025)',
      'Legal Consultant, Provincial Government (2020-2025)',
      'Board Member, Camarines Norte Bar Association'
    ]
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
    isLeadership: true,
    achievements: [
      'Streamlined municipal budget allocation process',
      'Established community health outreach programs',
      'Implemented gender-responsive budgeting initiatives',
      'Led disaster relief coordination efforts'
    ],
    education: [
      'Master in Public Administration, University of the Philippines',
      'Bachelor of Science in Nursing, Bicol University'
    ],
    experience: [
      'Municipal Health Officer (2018-2025)',
      'Community Health Program Coordinator',
      'Women\'s Organization Leader'
    ]
  },
  // Add other members with similar detailed structure...
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
    isLeadership: true,
    achievements: [
      'Led major infrastructure development projects',
      'Implemented environmental protection ordinances',
      'Established sustainable housing programs',
      'Promoted eco-tourism initiatives'
    ],
    education: [
      'Bachelor of Science in Civil Engineering, Mapua University',
      'Certificate in Environmental Management, UP Diliman'
    ],
    experience: [
      'Municipal Engineer (2020-2025)',
      'Private Construction Contractor',
      'Environmental Consultant'
    ]
  }
  // Continue with other members...
];

// Committee data
const committees: Committee[] = [
  {
    id: 'agriculture',
    name: 'Agriculture, Food, Fisheries, and Aquatic Resources',
    members: [
      { name: 'Hon. Arlene V. Mena', role: 'Chairman' },
      { name: 'Hon. Caroline O. Portugal', role: 'Vice Chairman' },
      { name: 'Hon. Elmer M. Malaluan', role: 'First Member' },
      { name: 'Hon. Robinson E. Ricasio', role: 'Second Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Third Member' }
    ],
    description: 'Oversees agricultural development, food security, fisheries management, and aquatic resource conservation to support local farmers and fisherfolk.'
  }
  // Add other committees...
];

export function MemberDetailPage({ memberId, onBack }: MemberDetailPageProps) {
  const member = members.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Member Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The requested council member could not be found.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Chairman') || role.includes('Chairperson')) {
      return <Crown className="w-4 h-4 text-yellow-500" />;
    } else if (role.includes('Vice')) {
      return <Award className="w-4 h-4 text-blue-500" />;
    } else {
      return <UserCheck className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Members
        </button>
      </div>

      {/* Member Profile */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-800 text-white p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-blue-400"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400';
                }}
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {member.name}
              </h1>
              <p className="text-xl text-blue-300 font-semibold mb-2">
                {member.title}
              </p>
              <p className="text-blue-200 mb-4">
                {member.position}
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                {member.contact.phone && (
                  <div className="flex items-center gap-2 text-blue-200">
                    <Phone className="w-4 h-4" />
                    <span>{member.contact.phone}</span>
                  </div>
                )}
                {member.contact.email && (
                  <div className="flex items-center gap-2 text-blue-200">
                    <Mail className="w-4 h-4" />
                    <span>{member.contact.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-blue-200">
                  <Calendar className="w-4 h-4" />
                  <span>Term: {formatDate(member.termStart)} - {formatDate(member.termEnd)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8">
          {/* Biography */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Biography
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {member.biography}
            </p>
          </section>

          {/* Leadership Roles */}
          {member.leadership.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Leadership Roles
              </h2>
              <div className="space-y-2">
                {member.leadership.map((role, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    {getRoleIcon(role)}
                    <span className="font-medium text-gray-800">{role}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Committee Assignments */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Committee Assignments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {member.committees.map((committee, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm text-gray-700">{committee}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          {member.achievements && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Key Achievements
              </h2>
              <ul className="space-y-2">
                {member.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Education & Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            {member.education && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Education
                </h2>
                <ul className="space-y-2">
                  {member.education.map((edu, index) => (
                    <li key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Experience */}
            {member.experience && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Professional Experience
                </h2>
                <ul className="space-y-2">
                  {member.experience.map((exp, index) => (
                    <li key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="text-gray-700">{exp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 lg:px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Municipal Hall, Capalonga</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Office Hours: 8:00 AM - 5:00 PM</span>
              </div>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}