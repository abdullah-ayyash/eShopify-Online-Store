
import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Box from '@mui/material/Box';
import Profile from './Profile';
import Cart from './Cart';

function User({ isLoggedIn, userData }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };


  return (
    <div id="user-container">

      <div id="tabs-container">
        <Tabs value={currentTabIndex} onChange={handleTabChange} orientation="vertical" >
          <Tab label='Profile info' sx={{ fontSize: 16 }} />
          <Tab label='Cart' sx={{ fontSize: 16 }} />
        </Tabs>
      </div>

      <div class="vl"></div>

      <div id="profile-content">

        {/* TAB 1 Contents */}
        {currentTabIndex === 0 && (
          <Box sx={{ p: 3 }}>
            <Profile isLoggedIn={isLoggedIn} userData={userData} />
          </Box>
        )}

        {/* TAB 2 Contents */}
        {currentTabIndex === 1 && (
          <Box sx={{ p: 3 }}>
            <Cart />
          </Box>
        )}


      </div>

    </div>
  );
}

export default User;
