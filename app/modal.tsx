import { StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className='flex-1 items-center justify-center p-5'>
      <Text>This is a modal</Text>
      {/* <Link href="/" dismissTo style={styles.link}>
        <Text>Go to home screen</Text>
      </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
