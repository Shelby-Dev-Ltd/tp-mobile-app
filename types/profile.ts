import { NavigationType } from "./navigation";
import { User } from "./user";

export type ProfileProps = {
    profile: User,
    updateProfile: (email: string, name: string, photoUrl?: string) => Promise<User | null>;
    logout: () => void;
    navigation: NavigationType,
}

// export type Profile = {
//     id: number,
//     name: string,
//     email: string,
// }