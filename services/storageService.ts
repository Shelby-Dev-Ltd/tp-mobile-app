import { UploadResult, uploadBytes } from "@firebase/storage";

export const DoUploadToStorage = async (storageRef: any, file: any): Promise<UploadResult> => {
    try {
        const res: UploadResult = await uploadBytes(storageRef, file);
        return res;
    } catch (e) {
        return e
    }
}