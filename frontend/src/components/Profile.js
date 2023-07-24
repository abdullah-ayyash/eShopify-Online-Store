import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import profilePhoto from '../images/profile-photo.png'


function Profile({isLoggedIn,userData}) {
    const navigate = useNavigate();
    const { created_at,email,fullname,username } = userData;


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    return (
      <section id="profile-section">
        <div id="profile-photo">
        <img src={profilePhoto} alt="profile photo" />
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
    );
  }
  
  export default Profile;
  