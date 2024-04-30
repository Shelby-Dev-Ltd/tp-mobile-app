import { NavigationType } from "./navigation";

export type screenProps = {
    title: string,
    navigation: NavigationType,
    openedPage: string,
    params?: unknown,
    route: any,
}