import React, { useState } from "react";
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
import styles from "../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import calcMatch from "../assets/actions/matchCalc";

let list = 0;

let control = 0;


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
      console.log("Result: " + calcMatch(id));
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

  function ResultModal () {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMatchData}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Aqui vai aparecer os dados</Text>
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
