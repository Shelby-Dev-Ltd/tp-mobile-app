import { DestinationType } from "./navigation";
import { page } from "./page";

export type menuItemProps = {
    page: page,
    doNavigate: (destination: DestinationType) => void,
    isOpen: boolean,
}
