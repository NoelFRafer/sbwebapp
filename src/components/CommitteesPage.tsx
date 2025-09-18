import React from 'react';
import { 
  ArrowLeft, 
  Users, 
  Star, 
  Award,
  Building,
  User,
  Crown,
  UserCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useCommittees } from '../hooks/useCommittees';

interface CommitteesPageProps {
  onBack: () => void;
  onCommitteeClick?: (committeeId: string) => void;
}

export function CommitteesPage({ onBack, onCommitteeClick }: CommitteesPageProps) {
  const { committees, loading, error } = useCommittees();

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

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading committees...</span>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center p-8 text-red-600">
      <AlertCircle className="w-6 h-6 mr-2" />
      <span>{message}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (committees.length === 0) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Committees Found
          </h3>
          <p className="text-gray-500">
            No committees are currently available.
          </p>
        </div>
      </div>
    );
  }

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
                {committee.committee_members.map((committeeMember, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{committeeMember.member?.name || 'Unknown Member'}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(committeeMember.role)}`}>
                      {getRoleIcon(committeeMember.role)}
                      <span>{committeeMember.role}</span>
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
            <p>• <strong>Location:</strong> Committee Room, SB Session Hall</p>
            <p>• <strong>Public Participation:</strong> Citizens may attend committee meetings during public hearings</p>
            <p>• <strong>Committee Reports:</strong> Presented during regular Sangguniang Bayan sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
}