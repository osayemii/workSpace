import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { FiX, FiUserPlus, FiUsers, FiMail } from 'react-icons/fi';
import './TeamManagement.css';

const TeamManagement = ({ onClose, onUserSelect }) => {
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [currentTeam, setCurrentTeam] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Get user's teams
    const teamsQuery = query(
      collection(db, 'teams'),
      where('members', 'array-contains', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(teamsQuery, (snapshot) => {
      const teamsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeams(teamsData);
      if (teamsData.length > 0 && !currentTeam) {
        setCurrentTeam(teamsData[0].id);
      }
    });

    return () => unsubscribe();
  }, [currentTeam]);

  useEffect(() => {
    if (!currentTeam) return;

    const teamRef = doc(db, 'teams', currentTeam);
    const unsubscribe = onSnapshot(teamRef, (doc) => {
      if (doc.exists()) {
        const teamData = doc.data();
        // Fetch member details (simplified - in production, you'd fetch user profiles)
        setTeamMembers(teamData.members || []);
      }
    });

    return () => unsubscribe();
  }, [currentTeam]);

  const handleCreateTeam = async () => {
    try {
      const teamData = {
        name: `Team ${teams.length + 1}`,
        createdBy: auth.currentUser.uid,
        members: [auth.currentUser.uid],
        createdAt: new Date()
      };
      await addDoc(collection(db, 'teams'), teamData);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleInviteMember = async () => {
    if (!inviteEmail.trim() || !currentTeam) return;

    try {
      // In a real app, you'd send an invitation email
      // For now, we'll just add a placeholder
      alert(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setShowInviteForm(false);
    } catch (error) {
      console.error('Error inviting member:', error);
    }
  };

  return (
    <div className="team-management-overlay" onClick={onClose}>
      <div className="team-management-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-header">
          <h2>Team Management</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="team-content">
          <div className="teams-list">
            <div className="section-header">
              <h3>Your Teams</h3>
              <button className="create-team-btn" onClick={handleCreateTeam}>
                <FiUserPlus /> Create Team
              </button>
            </div>

            {teams.map((team) => (
              <div
                key={team.id}
                className={`team-item ${currentTeam === team.id ? 'active' : ''}`}
                onClick={() => setCurrentTeam(team.id)}
              >
                <FiUsers />
                <span>{team.name}</span>
              </div>
            ))}

            {teams.length === 0 && (
              <div className="empty-teams">
                <p>No teams yet. Create your first team!</p>
              </div>
            )}
          </div>

          <div className="team-members">
            <div className="section-header">
              <h3>Team Members</h3>
              {currentTeam && (
                <button
                  className="invite-btn"
                  onClick={() => setShowInviteForm(!showInviteForm)}
                >
                  <FiMail /> Invite
                </button>
              )}
            </div>

            {showInviteForm && (
              <div className="invite-form">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="invite-input"
                />
                <div className="invite-actions">
                  <button className="send-invite-btn" onClick={handleInviteMember}>
                    Send Invite
                  </button>
                  <button
                    className="cancel-invite-btn"
                    onClick={() => {
                      setShowInviteForm(false);
                      setInviteEmail('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="members-list">
              {teamMembers.map((memberId, index) => (
                <div key={index} className="member-item">
                  <div className="member-avatar">
                    {memberId.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="member-info">
                    <span className="member-name">User {index + 1}</span>
                    <span className="member-email">{memberId}</span>
                  </div>
                  {onUserSelect && (
                    <button
                      className="assign-btn"
                      onClick={() => onUserSelect(memberId)}
                    >
                      Assign
                    </button>
                  )}
                </div>
              ))}

              {teamMembers.length === 0 && currentTeam && (
                <div className="empty-members">
                  <p>No members in this team yet.</p>
                </div>
              )}

              {!currentTeam && (
                <div className="empty-members">
                  <p>Select a team to view members</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;













