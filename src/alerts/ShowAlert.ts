import { toast } from "react-hot-toast";
import alertTypes from "../util/types/AlertTypes";

export default function showAlert( type: alertTypes,msg : string, emoji: string) {
    let toastFunction;

    switch(type) {
        case alertTypes.SUCCESS:
            toastFunction = toast.success;
            break;
        case alertTypes.ERROR:
            toastFunction = toast.error;
            break;
        case alertTypes.LOADING:
            toastFunction = toast.loading;
            break;
        
        default:
            toastFunction = toast; 
    }

    toastFunction(`${msg}`, {
        icon: `${emoji}`,
        style: {
            fontFamily: "Tilt Warp, Sans-Serif",
        },
    });
}