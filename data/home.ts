import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { VehicleAPIResponse } from "../types/api/home";
import { Vehicles } from "../types/home";
import axios from "axios";

const useVehicleCount = () => {
    const { user } = useAuth();
    const fetcher = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/count/${user.id}`);
            const data: ApiResponse = response.data;

            if (data.error) throw Error(data.status.toString());

            const vehicles = data.data as VehicleAPIResponse;

            const colors = ["#e28743", "#abdbe3", "#8A76F7", "#c4ffec"];

            const images = [
                require("../assets/vehicleCount/3d-car.png"),
                require("../assets/vehicleCount/3d-bikes.png"),
                require("../assets/vehicleCount/3d-truck.png"),
                require("../assets/vehicleCount/3d-bus.png"),
            ];

            let structuredVehicles: Vehicles[] = [];

            Object.keys(vehicles).forEach((v, index) => {
                structuredVehicles.push({
                    name: v.slice(0, 1).toLocaleUpperCase() + v.slice(1, v.length),
                    count: vehicles[v],
                    cardColor: colors[index],
                    icon: images[index],
                })
            })

            return structuredVehicles;

        } catch (e) {
            console.error(e);
        }
    };

    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/count/${user.id}`, fetcher);

    return { data, error, isLoading, mutate };
}

export default useVehicleCount;