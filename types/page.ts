import { ionicon } from "./ioniconslist";
import { DestinationType } from "./navigation";

export type page = {
    title: string,
    destination: DestinationType,
    ioniconstring: ionicon | "home",
}