import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TraceabilityScreen from "./traceability-screen";
import { TabBar } from "../components/tab-bar";
import ProfileScreen from "./profile-screen";
import ScannScreen from "./scan-screen";
import SettingsScreen from "./settings-screen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: true, title: "Profile", tabBarLabel: 'user-circle-o', headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
            <Tab.Screen name="TraceabilityScreen" component={TraceabilityScreen} options={{headerShown: true, title: "Traceability", tabBarLabel: 'cubes', headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
            <Tab.Screen name="ScanScreen" component={ScannScreen} options={{headerShown: true, title: "Scan", tabBarLabel: 'qrcode', headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: true, title: "Settings", tabBarLabel: 'gear', headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
        </Tab.Navigator>
        // <Tab.Screen name="SownFormScreen" component={SownFormScreen} options={{headerShown: true, title: "Registrar siembra"}}/>
        // <Tab.Screen name="HarvestScreen" component={HarvestScreen} options={{headerShown: true, title: "Cosecha"}}/>
        // <Tab.Screen name="StoredScreen" component={StoredScreen} options={{headerShown: true, title: "Almacenado"}}/>
        // <Tab.Screen name="LogisticScreen" component={LogisticScreen} options={{headerShown: true, title: "Logistica"}}/>
    )
}

export default MainScreen;