import React, { useState, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { Message } from "../components";
import styles, {
  WHITE,
} from "../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import calcMatch from "../assets/actions/matchCalc";
import { Video, AVPlaybackStatus } from 'expo-av';
import Icon from "../components/Icon";

let list = 0;

let control = 0;

let matchValue = 0;

let improve = "";

let standart = [
  {
    id: 1,
    name: "Sem nada na lista? Deslize!",
    description:
      "Comece a deslizar",
    landscapeLink: "https://www.1recado.com/assets/icons/swipe-helper.gif",
  },
];

const Matches = () => {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [reloadControl, setReloadControl] = useState(1);
  const [modalMatchData, setmodalMatchData] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let likes;

      AsyncStorage.getItem("reload", (err, result) => {
        if ((!err && result != null) || control == 0){
          control += 10;

          setReloadControl(reloadControl + 1 );
          AsyncStorage.removeItem("reload");
          AsyncStorage.getItem("liked", (err, result) => {
            if (!err && result != null){
              likes = JSON.parse(result);
              AsyncStorage.getItem("AllJobs", (err, result) => {
              if (!err && result != null){
                const reorganize = JSON.parse(result).data;
                //console.log("LIKES: " + likes[0]);
                //console.log("JOBS: " + reorganize[0].name);
                likes.forEach(element => {
                  let i = -1;
                  reorganize.forEach((value) => {
                  i ++;
                  if (value.name == element) {
                    standart.push(value);
                    list++;
                  }
                  });
                });
              }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
      });

      //standart.push(up);
      //standart.push("");
    })
  );

  function cardClick(id) {
    console.log("Pressed: " + id);
    if(id != undefined) {
      //const result = calcMatch(id);
      //improve = whereImprove(result.work);
      //matchValue = result.match;
      setmodalMatchData(true);
    }
  }

  function Card (){
    return (
    <FlatList
        data={standart}
        keyExtractor={(item, index) => index.toString()}
        extraData={list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={ () => cardClick(item.idPosition) }>
            <Message
              image={{uri:item.landscapeLink}}
              name={item.name}
              message={item.description}
            />
          </TouchableOpacity>
        )}
      />
    )
  }

  function whereImprove (work) {
    let message = "\n";
    /*if (work.find("S")) {
      message += "Seu nível de escolaridade não é compatível com a vaga.\n";
    }
    if (work.find("L")) {
      message += "Você não possui o idioma compatível com a vaga.\n";
    }
    if (work.find("Ll")) {
      message += "Você não possui nível de idioma compatível com a vaga.\n";
    }
    if (work.find("X")) {
      message += "Você não possui experiência compatível com a vaga.\n";
    }
    if (work.find("Xl")) {
      message += "Você possui o tempo de experiência compatível com a vaga.\n";
    }
    if (work.find("K")) {
      message += "Você não possui a softkill compatível com a vaga.\n";
    }
    if (work.find("Kl")) {
      message += "Você não o nível de softkill ideal para a vaga.\n";
    }*/
    return message;
  }

  function ResultModal () {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMatchData}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.matchesCardItem}>
              <Text style={styles.matchesTextCardItem}>
                <Icon name="heart" color={WHITE} size={13} /> 80% Compatível no total
              </Text>
            </View>
            <Text style={styles.modalText}>
              - 100% na escolaridade;{'\n'}
              - 0% no idioma: Requer o idioma alemão;{'\n'}
              - 100% na experiência;{'\n'}
              - 100% em SoftSkill;
            </Text>
            <Text style={styles.modalText}>Recomendação de podcast:</Text>
            <View>
            <Video
              style={styles.video}
              source={{
                uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}
              useNativeControls
              resizeMode="contain"
            />
            </View>
            <TouchableOpacity>
            <Text style={styles.textStyle}>Fechar</Text>
          </TouchableOpacity>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                  setmodalMatchData(false);
                }
              }>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }

  return (

  <ImageBackground
    source={require("../assets/images/bg.png")}
    style={styles.bg}
  >

    <ResultModal/>

    <View style={styles.containerMessages}>
      <View style={styles.top}>
        <Text style={styles.title}>Matches</Text>
      </View>
      <Card></Card>
    </View>
  </ImageBackground>
  );
};

export default Matches;
