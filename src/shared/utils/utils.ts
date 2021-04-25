// TODO: verificar Clipboard deprecated

import { Alert, ToastAndroid, Clipboard } from "react-native";

export const showToast = (
  text: string,
  duration: number = ToastAndroid.SHORT,
  gravity: number = ToastAndroid.BOTTOM,
  xOffset: number = 25,
  yOffset: number = 100
) => {
  ToastAndroid.showWithGravityAndOffset(text, duration, gravity, xOffset, yOffset);
};

export const showAlert = (
  title: string,
  description: string,
  cbConfirm: () => void,
  textConfirm: string = "Continuar",
  cbCancel: () => void = () => {},
  textCancel: string = "Cancelar",
  cancelable: boolean = false
) => {
  Alert.alert(
    title,
    description,
    [
      {
        text: "Cancelar",
        onPress: () => cbCancel(),
      },
      {
        text: "Continuar",
        onPress: () => cbConfirm(),
      },
    ],
    { cancelable: cancelable }
  );
};

export const copyToClipboard = (string: string) => {
  Clipboard.setString(string);
};

export const clipboardPaste = (): Promise<string> =>{
    return Clipboard.getString().then(paste => paste).catch(err=>err);
}
