import profilePhoto from '../images/profile-photo.png'

function Profile({ isLoggedIn, userData }) {
  const { created_at, email, fullname, username } = userData;

  return (
    <div>
      <section id="profile-info-section">
        <div id="profile-photo">
          <img src={profilePhoto} alt="profile" />
        </div>
        <div id="profile-info">
          <h2>My Profile</h2>
          <hr />
          <p><strong>Full name: </strong>{fullname}</p>
          <p><strong>Username: </strong>{username}</p>
          <p><strong>Joined: </strong>{created_at}</p>
          <p><strong>Email: </strong>{email}</p>
        </div>

      </section>
    </div>
  );
}

export default Profile;
