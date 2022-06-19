import React from "react";
import {
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

let jobs;

AsyncStorage.getItem("AllJobs", (err, result) => {
  if (!err && result != null){
    console.log("Temos vagas offline");
    jobs = JSON.parse(result);
  } else {
    console.log("Não temos vagas offline");
    jobs = [
      {
        id: 1,
        name: "AServidor inacessível",
        match: "0",
        description:
          "Verifique sua conexão",
        message:
          "Se sua conexão estiver operacional, acione o administrador.",
        info1: "Não disponível",
        info2: "Não disponível",
        info3: "Não disponível",
        info5: "Não disponível",
        image: "https://png.pngitem.com/pimgs/s/179-1795994_no-network-wifi-no-signal-icon-hd-png.png",
      },
    ];
  }
});

const Chat = () => {

  //Calcular porcentagem comparando perfil da pessoa e dados da posição. Gerar um gráfico e exibir abaixo

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri:jobs.image}} style={styles.photo}></ImageBackground>

        <JobItem
          name={jobs.name}
          description={jobs.description}
        />

      </ScrollView>
    </ImageBackground>
  );
};

export default Chat;
