import React from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Persons from "../assets/data/persons";
import styles, { WHITE } from "../assets/styles";

const Profile = () => {
  const {
    image,
    info1,
    info2,
    info3,
    info4,
    info5,
    name,
  } = Persons[0];

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>
            
          </View>
        </ImageBackground>

        <ProfileItem
          name={name}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
          info5={info5}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.roundedButton}>
            <MaterialCommunityIcons name="restart" size={20} color={WHITE} />
            <Text style={styles.textButton}>Recomeçar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
