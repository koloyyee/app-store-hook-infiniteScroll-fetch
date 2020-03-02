import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppleIcon from "@material-ui/icons/Apple";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import HomeIcon from "@material-ui/icons/Home";


const BottomNav = () => {
  const [value, setValue] = useState("Apple");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      style={{
        position:'sticky',
        bottom: '0%',
        borderTop: 'solid 1px lightgrey',
      }}
    >
      <BottomNavigationAction
        label="AppStore"
        value="App Store"
        icon={<AppleIcon />}
      />
      <BottomNavigationAction
        label="Mock"
        value="Mock"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        label="with"
        value="with"
        icon={<ThumbUpIcon />}
      />
      <BottomNavigationAction label="Hooks" value="Hooks" icon={<HomeIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
