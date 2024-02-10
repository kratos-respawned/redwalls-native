import { SimpleLineIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>['name'];
  color: string;
  size: number;
}) {
  return <SimpleLineIcons {...props} size={props.size} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 16 },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Redwalls',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon size={size} name="social-reddit" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="anime"
        options={{
          headerTitle: 'Anime',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="ghost" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mobile"
        options={{
          headerTitle: 'Mobile',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="screen-smartphone" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
