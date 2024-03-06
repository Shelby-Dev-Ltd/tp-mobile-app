import { page } from "./page";

export type menuItemProps = {
    page: page,
    doNavigate: (destination: string) => void,
    isOpen: boolean,
}
