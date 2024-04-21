import { StyleSheet, Text, View, Image } from "react-native";
import { avatarStyles } from "../../styles/avatar";

const Avatar = ({id, src, alt} : {id: any, src: any, alt: any}) => {

    return (
        <View>
            {src ? (
                <Image 
                    id={id} 
                    src={src} 
                    alt={alt} 
                    style={avatarStyles.container}
                />
            ) : (
                <Image
                    id={id}
                    src={
                        "https://sp-ao.shortpixel.ai/client/q_lossless,ret_img,w_250/https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"
                    }
                    alt={alt}
                    style={avatarStyles.container}
                />
            )}   
        </View>
    );
}

export default Avatar;
