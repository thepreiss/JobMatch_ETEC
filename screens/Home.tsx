import React, { useState, useEffect } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CardItem } from "../components";
import styles from "../assets/styles";
import IMAGE_NOJOBS from "../assets/images/noJobs.jpg";
import api from "../assets/services/api";
import { AxiosResponse } from 'axios';
import { DataT } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

let jobs: String[] = [];

AsyncStorage.getItem("pastJob", (err, result) => {
  if (!err && result != null){
    jobs = JSON.parse(result);
  }
});

const Home = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  const [listCard, setListCard] = useState([]);

  useEffect(() => {
    api.get("/getCards").then((response: AxiosResponse) => {
      const reorganize = response.data;
      if (jobs != null) {
          jobs.forEach(element => {
          let i = -1;
          reorganize.forEach((value: DataT) => {
            i ++;
            if (value.name == element) {
              reorganize.splice(i, 1); // 2nd parameter means remove one item only
            }
          });
        });
      }
      setListCard(reorganize);
    });
  }, []);

 /* AsyncStorage.getItem("user", (err, result) => {
      if (!err && result != null){
        const data = JSON.parse(result);
        AsyncStorage.setItem("user", JSON.stringify(persons));
      } else {

      }
    }
  ); */

  return (
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.bg}
      >
        <View style={styles.containerHome}>
          <View style={styles.top}>
          </View>

          <CardStack
            //loop
            verticalSwipe={false}
            horizontalSwipe={true}
            renderNoMoreCards={() => 
            <Card key="FirstOne">
              <CardItem
                hasActions= {false}
                name="Não há posições disponíveis. Aguarde a atualização ou volte mais tarde :)"
                image={IMAGE_NOJOBS}
              />
            </Card>
          }
            ref={(newSwiper): void => setSwiper(newSwiper)}
          >
            {listCard.map((job: DataT) => (
              <Card key={"" + job.idPosition} onSwipedRight={() => {
                jobs.push(job.name);
                AsyncStorage.setItem("pastJob", JSON.stringify(jobs));
                AsyncStorage.setItem("liked", JSON.stringify(jobs));
                console.log("LIKE: " + job.name);
              }}
              onSwipedLeft={() => {
                jobs.push(job.name);
                AsyncStorage.setItem("pastJob", JSON.stringify(jobs));
                AsyncStorage.setItem("unliked", JSON.stringify(jobs));
                console.log("UNLIKE: "  + job.name);
              }}>
                <CardItem
                  hasActions
                  image={{uri: job.landscapeLink}}
                  name={job.name}
                  description={job.description}
                  matches={job.match}
                  area={job.idArea}
                />
              </Card>
            ))}
          </CardStack>
        </View>
      </ImageBackground>
  );
};

export default Home;
