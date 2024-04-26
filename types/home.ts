import { User } from "./user";

export type Vehicles = {
    name: string,
    count: number,
    cardColor: string,
    icon?: string,
}

export type VehicleCountProps = {
    vehicles: Array<Vehicles>;
}

export type WelcomeProps = {
    user: User;
}