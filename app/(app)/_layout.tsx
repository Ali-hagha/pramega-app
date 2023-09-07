import { Slot, Stack } from 'expo-router';
import { View } from 'react-native';
import BottomNav from '../../components/ui/BottomNav/BottomNav';

const HomeLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, animation: 'default' }} />
      <BottomNav />
    </View>
  );
};

export default HomeLayout;
