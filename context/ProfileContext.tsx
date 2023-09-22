import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext(null);


export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};


export const ProfileProvider = ({ children }) => {
  const [profileState, setProfileState] = useState({
    id: null,
    uuid: null,
    name: null,
    phone_number: null,
    email: "",
    gender_id: null,
    gender_name: "",
    pic: null,
    location: "",
    wilaya_id: null,
    wilaya_number: "",
    wilaya_name: "",
    socials: [],
    is_verified: null,
    firstName: "",
    lastName: "",
    bio: "",
    role_name: "",
    total_pets_proposed: 0,
    total_pets_lost: 0,
  });

  const updateProfile = (updatedFields) => {
    setProfileState(prevState => ({
      ...prevState,
      ...updatedFields
    }));
  };

  return (
    <ProfileContext.Provider value={{ profileState: profileState, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

/*
 // To update single or multiple fields
  updateProfile({ username: 'new_username', email: 'new_email@example.com' });

  // To update all fields at once
  updateProfile({
    username: 'new_username',
    profile_picture: 'new_picture',
    social_media: ['new_facebook', 'new_twitter'],
    credit: 100,
    phone_number: '123-456-7890',
    email: 'new_email@example.com',
    bio: 'new_bio',
    location: 'new_location'
  });
  */