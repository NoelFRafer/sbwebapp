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
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useCommittee } from '../hooks/useCommittee';

interface CommitteeDetailPageProps {
  committeeId: string;
  onBack: () => void;
}

export function CommitteeDetailPage({ committeeId, onBack }: CommitteeDetailPageProps) {
  const { committee, loading, error } = useCommittee(committeeId);

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

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading committee details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center p-12 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Error Loading Committee
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Committees
          </button>
        </div>
      </div>
    );
  }

  // Not found state
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
              {committee.committee_members.map((committeeMember, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{committeeMember.member?.name || 'Unknown Member'}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(committeeMember.role)}`}>
                    {getRoleIcon(committeeMember.role)}
                    <span>{committeeMember.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Responsibilities */}
          {committee.responsibilities && committee.responsibilities.length > 0 && (
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
          )}

          {/* Recent Activities */}
          {committee.recent_activities && committee.recent_activities.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activities
              </h2>
              <div className="space-y-3">
                {committee.recent_activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {committee.achievements && committee.achievements.length > 0 && (
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
          )}

          {/* Upcoming Meetings */}
          {committee.upcoming_meetings && committee.upcoming_meetings.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Meetings
              </h2>
              <div className="space-y-3">
                {committee.upcoming_meetings.map((meeting, index) => (
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
          )}
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