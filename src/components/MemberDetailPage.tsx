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
  MapPin,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useMember } from '../hooks/useMember';

interface MemberDetailPageProps {
  memberId: string;
  onBack: () => void;
}

export function MemberDetailPage({ memberId, onBack }: MemberDetailPageProps) {
  const { member, loading, error } = useMember(memberId);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading member details...</span>
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
            Error Loading Member
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  // Not found state
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
                src={member.image_url}
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
                {member.contact_phone && (
                  <div className="flex items-center gap-2 text-blue-200">
                    <Phone className="w-4 h-4" />
                    <span>{member.contact_phone}</span>
                  </div>
                )}
                {member.contact_email && (
                  <div className="flex items-center gap-2 text-blue-200">
                    <Mail className="w-4 h-4" />
                    <span>{member.contact_email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-blue-200">
                  <Calendar className="w-4 h-4" />
                  <span>Term: {formatDate(member.term_start)} - {formatDate(member.term_end)}</span>
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
          {member.is_leadership && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Leadership Roles
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  {getRoleIcon(member.position)}
                  <span className="font-medium text-gray-800">{member.position}</span>
                </div>
              </div>
            </section>
          )}

          {/* Committee Assignments */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Committee Assignments
            </h2>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700">
                Committee assignments are managed through the committee system. 
                Please refer to the Committees section for detailed information about this member's committee roles.
              </p>
            </div>
          </section>

          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
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
            {member.education && member.education.length > 0 && (
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
            {member.experience && member.experience.length > 0 && (
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
              Term: {formatDate(member.term_start)} - {formatDate(member.term_end)}
              <div className="flex items-center gap-2 ml-4">
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
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
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Members
            </button>
          </div>