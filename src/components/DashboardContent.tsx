'use client';

import React, { useState } from 'react';
import { MemberData } from '../app/dashboard/services/dashboardServices';

interface DashboardContentProps {
  members: MemberData[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ members }) => {
  const [selectedMemberStore, setSelectedMember] = useState<MemberData| null>(null);
  const [onHover, setOnHover] = useState<string | null>(null);
  // Calculate stats from members
  const stats = {
    totalMembers: members.length,
    totalMeetings: members.reduce((sum, member) => sum + member.meetings, 0),
    averageTokenPrice: members.length > 0 
      ? members.reduce((sum, member) => sum + member.tokenPrice, 0) / members.length 
      : 0,
    topPerformer: members.length > 0 
      ? members.reduce((prev, current) => 
          prev.tokenPrice > current.tokenPrice ? prev : current
        ) 
      : null
  };

  function selectedMember(member: MemberData) {
    setSelectedMember(member === selectedMemberStore ? null : member);
  }

  return (
    <div className="ml-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-black text-sm">Total Members</h2>
          <p className="text-2xl text-black font-semibold">{stats.totalMembers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-black text-sm">{selectedMemberStore ? `${selectedMemberStore.name} Meetings` : 'Total Meetings'}</h2>
          <p className="text-2xl text-black font-semibold">{selectedMemberStore ? selectedMemberStore.meetings : stats.totalMeetings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-black text-sm">{selectedMemberStore ? `${selectedMemberStore.name} Token Price` : 'Avg Token Price'}</h2>
          <p className="text-2xl text-black font-semibold">${selectedMemberStore ? selectedMemberStore.tokenPrice.toFixed(2) : stats.averageTokenPrice.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-black text-sm">Top Performer</h2>
          <p className="text-2xl text-black font-semibold">{stats.topPerformer?.name}</p>
        </div>
      </div>
      
      {/* Members list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b text-black">Members</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meetings</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-400 cursor-pointer">
            {members.map((member) => (
              <tr key={member.name} onClick={() => selectedMember(member)} onMouseEnter={() => setOnHover(member.name)} onMouseLeave={() => setOnHover(null)}>
                <td className={`${onHover === member.name ? 'bg-gray-100': ''} ${selectedMemberStore?.name === member.name ? 'bg-gray-300': ''} px-6 py-4 whitespace-nowrap`}>
                  <div className="flex items-center">
                    {member.picture ? (
                      <img className="h-10 w-10 rounded-full mr-3" src={member.picture} alt={member.name} />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-500">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td className={`${onHover === member.name ? 'bg-gray-100': ''} ${selectedMemberStore?.name === member.name ? 'bg-gray-300': ''} px-6 py-4 whitespace-nowrap`}>
                  <div className="text-sm text-gray-900">${member.tokenPrice.toFixed(2)}</div>
                </td>
                <td className={`${onHover === member.name ? 'bg-gray-100': ''} ${selectedMemberStore?.name === member.name ? 'bg-gray-300': ''} px-6 py-4 whitespace-nowrap`}>
                  <div className="text-sm text-gray-900">{member.meetings}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardContent;