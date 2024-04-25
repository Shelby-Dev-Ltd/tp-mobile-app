import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, Pressable, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { imagesDataURL } from '../constants/data';
import { ProfileProps } from "../../types/profile";

const windowHeight = Dimensions.get('window').height;

const Profile: React.FC<ProfileProps> = ({ navigation, profile, logout, updateProfile }) => {
    const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
    const [id, setId] = useState<number>(1);
    const [name, setName] = useState<string>('Arina Sabilahaq');
    const [email, setEmail] = useState<string>('arinasabilahaq@gmail.com');
    const [isEditing, setIsEditing] = useState(false);
    // const [password, setPassword] = useState('1234567');
    // const [country, setCountry] = useState('Jababeka, Bekasi Regency');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUser = await updateProfile(email, name);
            if (!updatedUser) throw Error();
        } catch (e) {
            console.error("Failed to save profile!");
            ToastAndroid.show("Failed to save profile!", ToastAndroid.LONG);
        } finally {
            setIsEditing(false);
        }

    };


    useEffect(() => {
        setId(profile.id);
        setName(profile.name);
        setEmail(profile.email);
    }, [profile]);

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 22 }} showsVerticalScrollIndicator={false}>
            <View style={{ minHeight: windowHeight }}>
                <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>My Profile</Text>
                </View>
                <View style={{ alignItems: 'center', marginVertical: 22 }}>
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={{ uri: selectedImage }}
                            style={{ height: 170, width: 170, borderRadius: 85, borderWidth: 2 }}
                        />
                        <View style={{ position: 'absolute', bottom: 0, right: 10, zIndex: 9999 }}>
                            <MaterialIcons name="photo-camera" size={32} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'blue', borderRadius: 10, marginVertical: 10 }}>
                    <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Personal Info</Text>
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
                    }}
                >
                    <Text>
                        {isEditing ? "Save Changes" : "Edit"}

                    </Text>
                </TouchableOpacity>
                <Pressable
                    onPress={() => logout()}
                    style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: 4,
                        backgroundColor: '#ff4d4d',
                        paddingVertical: 10,
                        marginVertical: 10,
                        borderRadius: 50
                    }}
                >
                    <Ionicons name="exit-outline" style={{ transform: [{ rotate: '180deg' }] }} size={20} />
                    <Text>Sign Out</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default Profile;