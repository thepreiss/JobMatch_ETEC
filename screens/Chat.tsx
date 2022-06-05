import React from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { JobItem } from "../components";
import Jobs from "../assets/data/jobs";
import styles from "../assets/styles";

const Chat = () => {
  const {
    image,
    info1,
    info2,
    info3,
    info4,
    info5,
    name,
    description,
    message,
  } = Jobs[0];

  //Calcular porcentagem comparando perfil da pessoa e dados da posição. Gerar um gráfico e exibir abaixo

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}></ImageBackground>

        <JobItem
          name={name}
          description={description}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
          info5={info5}
        />

      </ScrollView>
    </ImageBackground>
  );
};

export default Chat;
