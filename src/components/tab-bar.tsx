import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomMenuItem } from "./buttom-menu-item";

export const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const [translateValue] = useState(new Animated.Value(0));
    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / state.routes.length;

    const animateSlider = (index: number) => {
        Animated.spring(translateValue, {
          toValue: index * tabWidth,
          velocity: 10,
          useNativeDriver: true,
        }).start();
    };
    
    React.useEffect(() => {
        animateSlider(state.index);
    }, [state.index]);

    const renderButtons = () => {
        const items: any = [];
        state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const iconName =
                options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
                const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                }
      
                animateSlider(index);
            };
            const onLongPress = () => {
                navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                });
            };
            items.push(
                <TouchableOpacity
                  accessibilityRole="button"
                //   accessibilityStates={isFocused ? ["selected"] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ flex: 1 }}
                  key={index}
                >
                  <BottomMenuItem
                    iconName={iconName.toString()}
                    label={options.title!}
                    isCurrent={isFocused}
                  />
                </TouchableOpacity>
            );
        });
        return items;
    }

  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
        <View style={{ flexDirection: "row" }}>
            <Animated.View
                style={[style.slider, { transform: [{ translateX: translateValue }], width: tabWidth - 20}]}
            />
            {renderButtons()}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
    tabContainer: {
        height: 80,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.0,
        backgroundColor: "#00FF83",
        elevation: 10,
        position: "absolute",
        bottom: 0
    },
    slider: {
        height: '100%',
        position: "absolute",
        top: 0,
        left: 10,
        backgroundColor: "#8C705BCC",
        width: 50
    },
});