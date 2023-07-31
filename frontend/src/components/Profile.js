import profilePhoto from '../images/profile-photo.png'

function Profile({ isLoggedIn, userData }) {
  const { created_at, email, fullname, username } = userData;
  const dateObject = new Date(created_at);
  const year = dateObject.getFullYear();
  return (
    <div>
      <section id="profile-info-section">
        <h1>My Profile</h1>
        <div id="profile-photo">
          <img src={profilePhoto} alt="profile" />
        </div>
        <div id="profile-info">
          <p><strong>Full name: </strong>{fullname}</p>
          <p><strong>Username: </strong>{username}</p>
          <p><strong>Joined: </strong>{year}</p>
          <p><strong>Email: </strong>{email}</p>
        </div>

      </section>
    </div>
  );
}

export default Profile;
