import { SimpleLineIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>['name'];
  color: string;
  size: number;
}) {
  return <SimpleLineIcons style={styles.tabBarIcon} {...props} size={props.size} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: '',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon size={size} name="social-reddit" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="anime"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="ghost" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mobile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="screen-smartphone" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
