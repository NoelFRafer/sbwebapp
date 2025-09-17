import React from 'react';
import { 
  ArrowLeft, 
  Users, 
  Star, 
  Award,
  Building,
  User,
  Crown,
  UserCheck
} from 'lucide-react';

interface CommitteesPageProps {
  onBack: () => void;
  onCommitteeClick?: (committeeId: string) => void;
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
    description: 'Coordinates with barangay officials and addresses local governance issues to ensure effective service delivery at the grassroots level.'
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
    description: 'Promotes cooperative development, supports civil society organizations, and addresses trade, industry, labor, and employment concerns.'
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
    description: 'Focuses on improving educational facilities, programs, and opportunities for students and educators in the municipality.'
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
    description: 'Promotes tourism development, preserves local culture, and supports arts initiatives to boost economic growth and cultural identity.'
  },
  {
    id: 'appropriations',
    name: 'Appropriations & Ways and Means',
    members: [
      { name: 'Hon. Caroline O. Portugal', role: 'Chairman' },
      { name: 'Hon. Jumaro R. Parale', role: 'Vice Chairman' },
      { name: 'Hon. Arlene V. Mena', role: 'First Member' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Second Member' },
      { name: 'Hon. Elmer M. Malaluan', role: 'Third Member' }
    ],
    description: 'Reviews and approves the municipal budget, oversees financial planning, and ensures proper allocation of public funds.'
  },
  {
    id: 'games',
    name: 'Games and Amusements',
    members: [
      { name: 'Hon. Elmer M. Malaluan', role: 'Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Vice Chairman' },
      { name: 'Hon. Leslie B. Esturas', role: 'First Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Second Member' },
      { name: 'Hon. John Ernie M. Talento', role: 'Third Member' }
    ],
    description: 'Regulates games and amusement activities, issues permits, and ensures compliance with local ordinances and regulations.'
  },
  {
    id: 'good-government',
    name: 'Good Government and Public Accountability',
    members: [
      { name: 'Hon. Mariano L. Arguelles', role: 'Chairman' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Vice Chairman' },
      { name: 'Hon. Juan P. Enero', role: 'First Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Second Member' },
      { name: 'Hon. Jumaro R. Parale', role: 'Third Member' }
    ],
    description: 'Promotes transparency, accountability, and good governance practices in all municipal operations and services.'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure, Housing, Land Utilization, and Environmental Protection',
    members: [
      { name: 'Hon. Abel P. Malaluan IV', role: 'Chairman' },
      { name: 'Hon. Jumaro R. Parale', role: 'Vice Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'First Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Second Member' },
      { name: 'Hon. John Ernie M. Talento', role: 'Third Member' }
    ],
    description: 'Oversees infrastructure development, housing programs, land use planning, and environmental protection initiatives.'
  },
  {
    id: 'youth-sports',
    name: 'Youth and Sports Development',
    members: [
      { name: 'Hon. John Ernie M. Talento', role: 'Chairman' },
      { name: 'Hon. Juan P. Enero', role: 'Vice Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'First Member' },
      { name: 'Hon. Robinson E. Ricasio', role: 'Second Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Third Member' }
    ],
    description: 'Develops youth programs, promotes sports activities, and creates opportunities for young people in the municipality.'
  },
  {
    id: 'social-services',
    name: 'Social Services',
    members: [
      { name: 'Hon. Jumaro R. Parale', role: 'Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Vice Chairman' },
      { name: 'Hon. Leslie B. Esturas', role: 'First Member' },
      { name: 'Hon. Caroline O. Portugal', role: 'Second Member' },
      { name: 'Hon. Elmer M. Malaluan', role: 'Third Member' }
    ],
    description: 'Addresses social welfare needs, supports vulnerable populations, and implements social assistance programs.'
  },
  {
    id: 'health',
    name: 'Health and Sanitation',
    members: [
      { name: 'Hon. Juan P. Enero', role: 'Chairman' },
      { name: 'Hon. Leslie B. Esturas', role: 'Vice Chairman' },
      { name: 'Hon. John Ernie M. Talento', role: 'First Member' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Second Member' },
      { name: 'Hon. Caroline O. Portugal', role: 'Third Member' }
    ],
    description: 'Oversees public health programs, sanitation services, and healthcare facility management in the municipality.'
  },
  {
    id: 'market',
    name: 'Public Market and Slaughter House',
    members: [
      { name: 'Hon. Arlene V. Mena', role: 'Chairman' },
      { name: 'Hon. Caroline O. Portugal', role: 'Vice Chairman' },
      { name: 'Hon. Elmer M. Malaluan', role: 'First Member' },
      { name: 'Hon. Juan P. Enero', role: 'Second Member' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Third Member' }
    ],
    description: 'Manages public market operations, slaughterhouse facilities, and ensures food safety and sanitation standards.'
  },
  {
    id: 'ethics',
    name: 'Ethics, Rules, and Privileges',
    members: [
      { name: 'Hon. Mariano L. Arguelles', role: 'Chairman' },
      { name: 'Hon. Leslie B. Esturas', role: 'Vice Chairman' },
      { name: 'Hon. John Ernie M. Talento', role: 'First Member' },
      { name: 'Hon. Jumaro R. Parale', role: 'Second Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Third Member' }
    ],
    description: 'Maintains ethical standards, establishes council rules and procedures, and addresses privilege matters.'
  },
  {
    id: 'ordinances',
    name: 'Ordinances and Legal Matters',
    members: [
      { name: 'Hon. Jumaro R. Parale', role: 'Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Vice Chairman' },
      { name: 'Hon. Juan P. Enero', role: 'First Member' },
      { name: 'Hon. Robinson E. Ricasio', role: 'Second Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Third Member' }
    ],
    description: 'Reviews and drafts ordinances, handles legal matters, and ensures compliance with local and national laws.'
  },
  {
    id: 'peace-order',
    name: 'Peace and Order and Human Rights',
    members: [
      { name: 'Hon. Elmer M. Malaluan', role: 'Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'Vice Chairman' },
      { name: 'Hon. Leslie B. Esturas', role: 'First Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Second Member' },
      { name: 'Hon. Caroline O. Portugal', role: 'Third Member' }
    ],
    description: 'Maintains peace and order, protects human rights, and coordinates with law enforcement agencies.'
  },
  {
    id: 'transportation',
    name: 'Transportation, Communication, Public Utilities, Facilities, and Information Technology',
    members: [
      { name: 'Hon. Mariano L. Arguelles', role: 'Chairman' },
      { name: 'Hon. Elmer M. Malaluan', role: 'Vice Chairman' },
      { name: 'Hon. Juan P. Enero', role: 'First Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Second Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Third Member' }
    ],
    description: 'Oversees transportation systems, communication infrastructure, public utilities, and IT development.'
  },
  {
    id: 'women-children',
    name: 'Women, Children, and Family Welfare',
    members: [
      { name: 'Hon. Arlene V. Mena', role: 'Chairman' },
      { name: 'Hon. Jumaro R. Parale', role: 'Vice Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'First Member' },
      { name: 'Hon. Elmer M. Malaluan', role: 'Second Member' },
      { name: 'Hon. Abel P. Malaluan IV', role: 'Third Member' }
    ],
    description: 'Protects women and children\'s rights, promotes family welfare, and addresses gender-related issues.'
  },
  {
    id: 'disaster-management',
    name: 'Disaster Risk Reduction Management',
    members: [
      { name: 'Hon. Juan P. Enero', role: 'Chairman' },
      { name: 'Hon. Jumaro R. Parale', role: 'Vice Chairman' },
      { name: 'Hon. Mariano L. Arguelles', role: 'First Member' },
      { name: 'Hon. Arlene V. Mena', role: 'Second Member' },
      { name: 'Hon. Leslie B. Esturas', role: 'Third Member' }
    ],
    description: 'Develops disaster preparedness plans, coordinates emergency response, and implements risk reduction measures.'
  }
];

export function CommitteesPage({ onBack, onCommitteeClick }: CommitteesPageProps) {
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
              <h1 className="text-3xl font-bold text-gray-800">Standing Committees</h1>
              <p className="text-lg text-gray-600">Sangguniang Bayan ng Capalonga</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            The Sangguniang Bayan operates through specialized standing committees that focus on specific areas 
            of governance and public service. Each committee is composed of council members who bring their 
            expertise to address the diverse needs of our municipality.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p className="font-medium">Term: 2025-2028</p>
          </div>
        </div>
      </div>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {committees.map((committee) => (
          <div 
            key={committee.id} 
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onCommitteeClick?.(committee.id)}
          >
            {/* Committee Header */}
            <div className="bg-slate-800 text-white p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {committee.name}
                  </h3>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                {committee.description}
              </p>
            </div>

            {/* Committee Members */}
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Committee Composition
              </h4>
              
              <div className="space-y-3">
                {committee.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{member.name}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      <span>{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View Details Link */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  View Committee Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-12 bg-slate-800 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Committee Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{committees.length}</h3>
            <p className="text-blue-200">Standing Committees</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">11</h3>
            <p className="text-blue-200">Council Members</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{committees.length}</h3>
            <p className="text-blue-200">Committee Chairpersons</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">Committee Meeting Information</h3>
          <div className="text-sm text-blue-100 space-y-2">
            <p>• <strong>Regular Committee Meetings:</strong> As scheduled by each committee chairperson</p>
            <p>• <strong>Location:</strong> Committee Room, Municipal Hall</p>
            <p>• <strong>Public Participation:</strong> Citizens may attend committee meetings during public hearings</p>
            <p>• <strong>Committee Reports:</strong> Presented during regular Sangguniang Bayan sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
}