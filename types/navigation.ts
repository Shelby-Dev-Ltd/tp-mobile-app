import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {

    base: undefined;

    home: undefined; //current screen

    records: { refresh?: boolean };

    video: undefined;

    analytics: undefined;

    signup: undefined;

    profile: undefined;

    recordDetail: { id: number }

    // // Page with params sample
    // ScreenTwo: { slug: string };

    // ScreenThree: { data: Array<string> };
};

export type DestinationType = "home" | "analytics" | "video" | "records" | "signup" | "profile" | "recordDetail" | "base";

export type NavigationType = NativeStackNavigationProp<RootStackParamList, any>

export type RoutePropsType = { route: RouteProp<ParamListBase, "records">; navigation: NavigationType; }