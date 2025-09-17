import React from 'react';
import { 
  ArrowLeft, 
  Users, 
  Crown,
  Star,
  UserCheck,
  Building,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Target,
  CheckCircle
} from 'lucide-react';

interface CommitteeDetailPageProps {
  committeeId: string;
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
  responsibilities: string[];
  recentActivities: string[];
  upcomingMeetings: {
    date: string;
    time: string;
    agenda: string;
  }[];
  achievements: string[];
  jurisdiction: string;
}

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
    description: 'Oversees agricultural development, food security, fisheries management, and aquatic resource conservation to support local farmers and fisherfolk.',
    responsibilities: [
      'Review and recommend agricultural development programs',
      'Monitor food security initiatives and policies',
      'Oversee fisheries management and aquaculture projects',
      'Evaluate agricultural extension services',
      'Assess irrigation and farming infrastructure needs',
      'Review agricultural loan and subsidy programs'
    ],
    recentActivities: [
      'Conducted public hearing on organic farming ordinance',
      'Reviewed budget allocation for agricultural extension services',
      'Inspected municipal fish port facilities',
      'Met with farmers\' associations on crop insurance program'
    ],
    upcomingMeetings: [
      {
        date: '2025-01-15',
        time: '2:00 PM',
        agenda: 'Review of Agricultural Development Plan 2025'
      },
      {
        date: '2025-01-29',
        time: '2:00 PM',
        agenda: 'Public hearing on Fisheries Management Ordinance'
      }
    ],
    achievements: [
      'Established Municipal Agricultural Extension Office',
      'Implemented organic farming certification program',
      'Created fishermen\'s cooperative support system',
      'Launched seed subsidy program for rice farmers'
    ],
    jurisdiction: 'All matters relating to agriculture, food production, fisheries, and aquatic resources within the municipality'
  },
  {
    id: 'barangay-affairs',
    name: 'Barangay Affairs',
    members: [
      { name: 'Hon. Leslie B. Esturas', role: 'Chairman' },
      { name: 'Hon. John Ernie M. Talento', role: 'Vice Chairman' },
      { name: 'Hon. Elmer M. Malaluan', role: 'First Member' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Second Member' },
      { name: 'Hon. Juan P. Enero', role: 'Third Member' }
    ],
    description: 'Coordinates with barangay officials and addresses local governance issues to ensure effective service delivery at the grassroots level.',
    responsibilities: [
      'Coordinate with barangay officials on local issues',
      'Review barangay development plans and projects',
      'Monitor implementation of barangay programs',
      'Address inter-barangay disputes and concerns',
      'Evaluate barangay budget proposals',
      'Oversee barangay capacity building programs'
    ],
    recentActivities: [
      'Quarterly meeting with all barangay captains',
      'Review of barangay development fund utilization',
      'Training workshop for barangay officials',
      'Assessment of barangay health stations'
    ],
    upcomingMeetings: [
      {
        date: '2025-01-20',
        time: '9:00 AM',
        agenda: 'Barangay Development Planning Workshop'
      }
    ],
    achievements: [
      'Established regular coordination meetings with barangays',
      'Implemented barangay performance monitoring system',
      'Created inter-barangay cooperation framework',
      'Launched barangay officials training program'
    ],
    jurisdiction: 'All matters concerning barangay governance, coordination, and local community affairs'
  },
  {
    id: 'cooperatives',
    name: 'Cooperatives, CSOs, POs, Trade, Industry, Labor, and Employment',
    members: [
      { name: 'Hon. Elmer M. Malaluan', role: 'Chairman' },
      { name: 'Hon. Caroline O. Portugal', role: 'Vice Chairman' },
      { name: 'Hon. Juan P. Enero', role: 'First Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Second Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Third Member' }
    ],
    description: 'Promotes cooperative development, supports civil society organizations, and addresses trade, industry, labor, and employment concerns.',
    responsibilities: [
      'Promote cooperative development and registration',
      'Support civil society organizations and people\'s organizations',
      'Review trade and industry development programs',
      'Address labor and employment issues',
      'Monitor business permit and licensing processes',
      'Evaluate livelihood and entrepreneurship programs'
    ],
    recentActivities: [
      'Cooperative development seminar for community groups',
      'Review of business permit streamlining process',
      'Job fair coordination with DOLE',
      'Assessment of livelihood programs effectiveness'
    ],
    upcomingMeetings: [
      {
        date: '2025-01-25',
        time: '10:00 AM',
        agenda: 'Cooperative Registration and Development Workshop'
      }
    ],
    achievements: [
      'Registered 15 new cooperatives in 2024',
      'Streamlined business permit application process',
      'Established municipal employment service office',
      'Launched skills training programs for unemployed residents'
    ],
    jurisdiction: 'Cooperatives, civil society organizations, trade, industry, labor relations, and employment matters'
  },
  {
    id: 'education',
    name: 'Education',
    members: [
      { name: 'Hon. Robinson E. Ricasio', role: 'Chairman' },
      { name: 'Hon. Jumaro R. Parale', role: 'Vice Chairman' },
      { name: 'Hon. Juan P. Enero', role: 'First Member' },
      { name: 'Hon. Caroline O. Portugal', role: 'Second Member' },
      { name: 'Hon. John Ernie M. Talento', role: 'Third Member' }
    ],
    description: 'Focuses on improving educational facilities, programs, and opportunities for students and educators in the municipality.',
    responsibilities: [
      'Review educational facility development plans',
      'Monitor school feeding and nutrition programs',
      'Evaluate scholarship and educational assistance programs',
      'Assess teacher training and development initiatives',
      'Review educational technology and equipment needs',
      'Coordinate with DepEd on educational policies'
    ],
    recentActivities: [
      'School building assessment and repair prioritization',
      'Review of municipal scholarship program guidelines',
      'Coordination meeting with school principals',
      'Evaluation of school feeding program effectiveness'
    ],
    upcomingMeetings: [
      {
        date: '2025-01-18',
        time: '1:00 PM',
        agenda: 'Educational Infrastructure Development Planning'
      }
    ],
    achievements: [
      'Constructed 5 new classrooms in 2024',
      'Expanded municipal scholarship program',
      'Implemented school feeding program in all elementary schools',
      'Provided educational technology equipment to schools'
    ],
    jurisdiction: 'All educational matters, facilities, programs, and services within the municipality'
  },
  {
    id: 'tourism',
    name: 'Tourism, Culture & Arts',
    members: [
      { name: 'Hon. Jumaro R. Parale', role: 'Chairman' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Vice Chairman' },
      { name: 'Hon. Caroline O. Portugal', role: 'First Member' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Second Member' },
      { name: 'Hon. Robinson E. Ricasio', role: 'Third Member' }
    ],
    description: 'Promotes tourism development, preserves local culture, and supports arts initiatives to boost economic growth and cultural identity.',
    responsibilities: [
      'Develop tourism promotion strategies and programs',
      'Preserve and promote local cultural heritage',
      'Support arts and cultural events and festivals',
      'Review tourism infrastructure development',
      'Coordinate with tourism stakeholders and operators',
      'Evaluate cultural preservation projects'
    ],
    recentActivities: [
      'Tourism development planning workshop',
      'Cultural heritage documentation project',
      'Festival planning and coordination meeting',
      'Tourism infrastructure assessment'
    ],
    upcomingMeetings: [
      {
        date: '2025-01-22',
        time: '3:00 PM',
        agenda: 'Annual Festival Planning and Cultural Events'
      }
    ],
    achievements: [
      'Established municipal tourism office',
      'Launched cultural heritage preservation program',
      'Organized successful annual town festival',
      'Developed tourism promotional materials'
    ],
    jurisdiction: 'Tourism development, cultural preservation, arts promotion, and related economic activities'
  }
  // Add more committees as needed...
];

export function CommitteeDetailPage({ committeeId, onBack }: CommitteeDetailPageProps) {
  const committee = committees.find(c => c.id === committeeId);

  if (!committee) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Committee Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The requested committee could not be found.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Committees
          </button>
        </div>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Chairman':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'Vice Chairman':
        return <Star className="w-4 h-4 text-blue-500" />;
      default:
        return <UserCheck className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Chairman':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Vice Chairman':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          Back to Committees
        </button>
      </div>

      {/* Committee Profile */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-800 text-white p-6 lg:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {committee.name}
              </h1>
              <p className="text-blue-200 leading-relaxed">
                {committee.description}
              </p>
            </div>
          </div>

          {/* Jurisdiction */}
          <div className="mt-6 p-4 bg-blue-900 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Jurisdiction
            </h3>
            <p className="text-blue-100 text-sm">
              {committee.jurisdiction}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8">
          {/* Committee Members */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Committee Composition
            </h2>
            <div className="space-y-3">
              {committee.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{member.name}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(member.role)}`}>
                    {getRoleIcon(member.role)}
                    <span>{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Responsibilities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Key Responsibilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {committee.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{responsibility}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </h2>
            <div className="space-y-3">
              {committee.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Key Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {committee.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Meetings */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Meetings
            </h2>
            <div className="space-y-3">
              {committee.upcomingMeetings.map((meeting, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-800">{meeting.agenda}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(meeting.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meeting.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 lg:px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Committee Room, Municipal Hall</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Meetings: As scheduled</span>
              </div>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Committees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}