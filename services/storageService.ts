import { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

interface UploadResult {
    progress: number;
    isLoading: boolean;
    triggerUpload: (file: DocumentPickerResponse) => void;
}

const storageService = (): UploadResult => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'your-web-client-id',
        });
    }, []);

    const getSignedUrl = async (): Promise<string | null> => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const userToken = userInfo?.idToken || '';
            const response = await fetch('your-server-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: userToken }),
            });
            const data = await response.json();
            return data.url || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const triggerUpload = async (file: DocumentPickerResponse) => {
        const signedUrl = await getSignedUrl();

        if (!signedUrl) {
            console.error('Failed to generate signed URL.');
            return;
        }

        try {
            const uploadUrl = signedUrl.split('?')[0];
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    setProgress((e.loaded / e.total) * 100);
                }
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        console.log('File uploaded successfully.');
                    } else {
                        console.error('Failed to upload file.');
                    }
                    setIsLoading(false);
                }
            };

            xhr.open('PUT', uploadUrl, true);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file.uri);

            setIsLoading(true);
        } catch (error) {
            console.error(error);
        }
    };

    return { progress, isLoading, triggerUpload };
};

export default storageService;
