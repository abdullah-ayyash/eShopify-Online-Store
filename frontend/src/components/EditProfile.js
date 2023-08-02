
import { useEffect, useState } from 'react';
import { useAuth } from '../authenticate/AuthContext'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';
import { changeUserInfo } from '../utils';


function EditProfile() {
    const navigate = useNavigate();

    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { userData,setUserInfoChange } = useAuth();
    const { fullname, email, user_id } = userData;

    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await changeUserInfo(newEmail,newPassword,newFullName,user_id);
        setUserInfoChange(prevUserInfoChange => !prevUserInfoChange);
        navigate('/user');
    }

    useEffect(() => {
        setNewFullName(fullname);
        setNewEmail(email);
    }, [])

    if (newFullName === '' || newEmail === '') {
        return <Loader />
    }

    return (
        <div>
            <div id='edit-profile-container'>
                <h1>Edit your info</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="fullname">Full name: </label>
                        <input type='text' name='fullname' id='fullname' value={newFullName} 
                        onChange={(e) => setNewFullName(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type='email' name='email' id='email' value={newEmail} 
                        onChange={(e) => setNewEmail(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type='password' name='password' id='password' value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>

                    <input type='submit' value='Save' />
                    <button onClick={()=>navigate('/user')}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;


