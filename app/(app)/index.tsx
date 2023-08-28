import { StyleSheet, ScrollView, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      <ScrollView style={styles.content}></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {},
});
