import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { VehicleAPIResponse } from "../types/api/home";
import { Vehicles } from "../types/home";



const fetcher = async () => {
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/count/1`)
        console.log(res);
        const data: ApiResponse = await res.json();

        if (data.error) throw Error(data.status.toString());

        const vehicles = data.data as VehicleAPIResponse;

        const colors = ["#e28743", "#abdbe3", "#8A76F7"];

        const images = [
            require("../assets/vehicleCount/3d-car.png"),
            require("../assets/vehicleCount/3d-bikes.png"),
            require("../assets/vehicleCount/3d-truck.png")
        ];

        let structuredVehicles: Vehicles[] = [];

        Object.keys(vehicles).forEach((v, index)=> {
            structuredVehicles.push({
                name: v.slice(0, 1).toLocaleUpperCase() + v.slice(1, v.length),
                count: vehicles[v],
                cardColor: colors[index % colors.length],
                icon: images[index % images.length],
            })
        })

        return structuredVehicles;

    } catch (e) {
        console.error(e);
    }
}

const useVehicleCount = () => {

    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/count/1`, fetcher);

    return { data, error, isLoading, mutate };
}

export default useVehicleCount;