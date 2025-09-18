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
  User,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useMembers } from '../hooks/useMembers';

interface MembersPageProps {
  onBack: () => void;
  onMemberClick?: (memberId: string) => void;
}

export function MembersPage({ onBack, onMemberClick }: MembersPageProps) {
  const { members, loading, error } = useMembers();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading members...</span>
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

  if (members.length === 0) {
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
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Members Found
          </h3>
          <p className="text-gray-500">
            No council members are currently available.
          </p>
        </div>
      </div>
    );
  }

  // Separate leadership and regular members
  const leadershipMembers = members.filter(member => member.is_leadership);
  const regularMembers = members.filter(member => !member.is_leadership);

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
                  src={member.image_url}
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
                {member.is_leadership && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Leadership Roles:</h4>
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mr-1 mb-1">
                        {member.position}
                      </span>
                    </div>
                  </div>
                )}

                {/* Committees */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Committee Assignments:</h4>
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mr-1 mb-1">
                      Multiple committees (view details for full list)
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4 space-y-2">
                  {member.contact_phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.contact_phone}</span>
                    </div>
                  )}
                  {member.contact_email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.contact_email}</span>
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
                    <span>Term: {formatDate(member.term_start)} - {formatDate(member.term_end)}</span>
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
                  src={member.image_url}
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
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mr-1 mb-1">
                      Multiple committees (view details for full list)
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4 space-y-2">
                  {member.contact_phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.contact_phone}</span>
                    </div>
                  )}
                  {member.contact_email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.contact_email}</span>
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
                    <span>Term: {formatDate(member.term_start)} - {formatDate(member.term_end)}</span>
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
              SB Session Hall<br />
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
              Session Hall, Municipal Building
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