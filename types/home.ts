import { User } from "./user";

export type Vehicles = {
    name: string,
    count: number,
    cardColor: string,
    icon?: any,
}

export type VehicleCountProps = {
    vehicles: Array<Vehicles>;
}

export type WelcomeProps = {
    user: User;
}