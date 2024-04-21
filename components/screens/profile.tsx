import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";

import React from 'react';
import { View } from 'react-native';
import Profile from "../profile/Profile";

const ProfileScreen: React.FC<screenProps> = ({ title, navigation, openedPage }) => {
    const content = (
        <View style={{ flex: 1 }}>
            <Profile navigation={navigation} />
        </View>
    )

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
};

export default ProfileScreen;
