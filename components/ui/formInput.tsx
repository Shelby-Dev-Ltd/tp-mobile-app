import React from 'react';
import { 
    TextInput,
    StyleSheet,
} from 'react-native';

interface FormInputProps {
    placeholder: string;
    iconName: string;
    secureTextEntry: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, secureTextEntry }) => {
    return (
        <TextInput 
            style={styles.input}
            placeholder= { placeholder }
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
        />
    );
};

const styles = StyleSheet.create({
    input: {
      width: '85%',
      height: 42,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#333333",
    },
  });
  
  export default FormInput;