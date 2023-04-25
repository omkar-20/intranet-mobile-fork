import Toast from 'react-native-simple-toast';

const bottomToast = (message: string, isError?: boolean) => {
  const duration = isError ? Toast.LONG : Toast.SHORT;
  return Toast.showWithGravityAndOffset(
    message,
    duration,
    Toast.BOTTOM,
    0,
    130,
  );
};
export default bottomToast;
