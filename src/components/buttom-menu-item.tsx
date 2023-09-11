import React from "react";
import { Text, View } from "react-native";
// import { blue, grey } from "../../styles";
// import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  iconName: string;
  label: string
  isCurrent?: boolean;
};

export const BottomMenuItem = ({ iconName, label, isCurrent }: Props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        gap: 4
      }}
    >
      <Icon size={28} name={iconName} style={{color: isCurrent ? '#fff' : '#1f1f1f'}}/>
      <Text style={{fontWeight: '500', color: isCurrent ? '#fff' : '#1f1f1f', fontSize: 12 }}>{label}</Text>
    </View>
  );
};