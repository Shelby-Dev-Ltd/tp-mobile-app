import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, Pressable, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { ProfileProps } from "../../../types/profile";
import { getStorage, ref } from "@firebase/storage";
import { app } from "../../../config/firebase";
import { DoUploadToStorage } from "../../../services/storageService";
import { useAuth } from "../../../contexts/AuthContext";
import Card from "../../ui/Card";

const { width, height } = Dimensions.get('window');

const Profile: React.FC<ProfileProps> = ({ navigation, profile, logout, updateProfile }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUser = await updateProfile(email, name, profile.profile.photoUrl);
            if (!updatedUser) throw Error();
        } catch (e) {
            console.error("Failed to save profile!");
            ToastAndroid.show("Failed to save profile!", ToastAndroid.LONG);
        } finally {
            setIsEditing(false);
        }

    };

    // on fetch profile, set default input data
    useEffect(() => {
        setName(profile.name);
        setEmail(profile.email);
    }, [profile]);

    const UploadToCloudStore = async (pictureUri: string) => {
        try {
            const response: any = await fetch(pictureUri);
            const blob = await response.blob();
            const pictureName = pictureUri.substring(pictureUri.lastIndexOf('/') + 1);

            const storage = getStorage(app)
            const storageRef = ref(storage, `user/${profile.id}/${pictureName}`)

            if (!storage) throw Error("No storage found!")

            const res = await DoUploadToStorage(storageRef, blob);
            return res;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            uploadPhoto(result.assets[0].uri);
        }
    };

    const uploadPhoto = async (localImagePath: string) => {
        try {
            const res = await UploadToCloudStore(localImagePath);

            if (!res) throw Error('failed to upload picture')

            const fullPath = res.ref.fullPath;
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/traffic-pulse-app.appspot.com/o/${encodeURIComponent(fullPath)}?alt=media`; ``

            updateProfile(profile.email, profile.name, publicUrl);

        } catch (e) {
            console.error(e);
            ToastAndroid.show(e, ToastAndroid.LONG);
        }
    }

    return (
        <ScrollView
            style={{
                flex: 1,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: 10,
                paddingTop: 10,
            }}>
                <Card
                    width={width - 40}
                >
                    <View style={{
                        marginHorizontal: 12,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold'
                            }}
                        >
                            Profile
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: 22 }}>
                        <TouchableOpacity onPress={handleImageSelection}>
                            <Image
                                source={{ uri: profile.profile.photoUrl }}
                                style={{ height: 170, width: 170, borderRadius: 85, borderWidth: 2 }}
                            />
                            <View style={{ position: 'absolute', bottom: 0, right: 10, zIndex: 9999 }}>
                                <MaterialIcons name="photo-camera" size={32} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'column', marginBottom: 6 }}>
                            <Text style={{ fontWeight: 'bold' }}>Name</Text>
                            <View style={{ height: 44, width: '100%', borderRadius: 4, borderWidth: 1, marginVertical: 6, justifyContent: 'center', paddingLeft: 8 }}>
                                <TextInput value={name} onChangeText={(value) => setName(value)} editable={isEditing} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: 6 }}>
                            <Text style={{ fontWeight: 'bold' }}>Email</Text>
                            <View style={{ height: 44, width: '100%', borderRadius: 4, borderWidth: 1, marginVertical: 6, justifyContent: 'center', paddingLeft: 8 }}>
                                <TextInput value={email} onChangeText={(value) => setEmail(value)} editable={isEditing} />
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'column', marginBottom: 6 }}>
                    <Text style={{ fontWeight: 'bold' }}>Location</Text>
                    <View style={{ height: 44, width: '100%', borderRadius: 4, borderWidth: 1, marginVertical: 6, justifyContent: 'center', paddingLeft: 8 }}>
                        <TextInput value={country} onChangeText={(value) => setCountry(value)} editable={true} />
                    </View>
                </View> */}
                    <TouchableOpacity
                        onPress={isEditing ? handleSaveChanges : handleEditClick}
                        style={{
                            height: 44,
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isEditing ? '#69ff84' : '#2F80ED',
                            paddingVertical: 10,
                            marginVertical: 10,
                            width: 100,
                        }}
                    >
                        <Text>
                            {isEditing ? "Save Changes" : "Edit"}

                        </Text>
                    </TouchableOpacity>
                    <Pressable
                        onPress={() => { logout(); navigation.replace('signup') }}
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: 4,
                            backgroundColor: '#ff4d4d',
                            paddingVertical: 10,
                            marginVertical: 10,
                            borderRadius: 50,
                            width: 100,
                        }}
                    >
                        <Ionicons name="exit-outline" style={{ transform: [{ rotate: '180deg' }] }} size={20} />
                        <Text>Sign Out</Text>
                    </Pressable>
                </Card>

            </View>
        </ScrollView >
    );
}

export default Profile;