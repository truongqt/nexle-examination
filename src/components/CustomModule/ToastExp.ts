import { NativeModules } from "react-native";

interface ToastExp {
    show: (message: string, duration: any) => void;
    SHORT: number,
    LONG: number
}

const MyToast: ToastExp = NativeModules.ToastExp;

export default MyToast;