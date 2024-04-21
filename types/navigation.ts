import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {

    home: undefined; //current screen

    records: undefined;

    video: undefined;

    analytics: undefined;

    signup: undefined;

    // // Page with params sample
    // ScreenTwo: { slug: string };

    // ScreenThree: { data: Array<string> };
};

export type DestinationType = "home" | "analytics" | "video" | "records" | "signup";

export type NavigationType = NativeStackNavigationProp<RootStackParamList, any>

export type RoutePropsType = { route: RouteProp<ParamListBase, "records">; navigation: NavigationType; }