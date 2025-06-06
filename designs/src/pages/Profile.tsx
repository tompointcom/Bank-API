import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/authService';
import type { RootState } from '../store/store';
import { setProfile } from '../store/authSlice';

const Profile = () => {
  const { userId } = useParams();
  const token = useSelector((state: RootState) => state.auth.token);
  const [profile, setProfileState] = useState<{ firstName: string; lastName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  useEffect(() => {
    if (!token || !userId) return;

    setLoading(true);
    setError("");

    getProfile(token)
      .then((data) => {
        setProfileState(data);
        dispatch(setProfile(data));
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger le profil utilisateur.");
        setLoading(false);
      });
  }, [token, userId, dispatch]);

  const handleEditClick = () => {
    setEditFirstName(profile?.firstName || "");
    setEditLastName(profile?.lastName || "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const updated = await updateProfile(token, {
        firstName: editFirstName,
        lastName: editLastName,
      });
      setProfileState(updated);
      dispatch(setProfile(updated));
      setIsEditing(false);
      setLoading(false);
    } catch {
      setError("Erreur lors de la sauvegarde du profil.");
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
 <div>
    <main className="main bg-light-grey">
      <div className="header">
        <h1>
          Welcome back<br />
          {!isEditing ? (
            <>
              {profile?.firstName} {profile?.lastName}!
            </>
          ) : (
            <div className="edit-name-fields">
              <input
                type="text"
                value={editFirstName}
                onChange={e => setEditFirstName(e.target.value)}
                placeholder={profile?.firstName || "First name"}
                className="edit-input"
              />
              <input
                type="text"
                value={editLastName}
                onChange={e => setEditLastName(e.target.value)}
                placeholder={profile?.lastName || "Last name"}
                className="edit-input"
              />
            </div>
          )}
        </h1>
          {!isEditing ? (
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
          ) : (
            <div className="edit-actions">
              <button className="edit-button-2" onClick={handleSave}>Save</button>
              <button className="edit-button-2" onClick={handleCancel}>Cancel</button>
            </div>
          )}
      </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button 
            className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Profile;