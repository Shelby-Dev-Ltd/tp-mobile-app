import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";

import React from 'react';
import { View } from 'react-native';
import Profile from "../profile/Profile";
import { useAuth } from "../../contexts/AuthContext";

const ProfileScreen: React.FC<screenProps> = ({ title, navigation, openedPage }) => {
    const { logout, user, update } = useAuth();

    const handleProfileUpdate = (email: string, name: string, photoUrl: string) => {
        update(email, name, photoUrl);

    }

    const content = (
        <View style={{ flex: 1 }}>
            <Profile
                navigation={navigation}
                profile={user}
                logout={logout}
                updateProfile={update}
            />
        </View>
    )

    if (!user) {
        return null;
    }

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
};

export default ProfileScreen;
