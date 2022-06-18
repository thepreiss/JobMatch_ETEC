import React, { useState, useEffect } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CardItem } from "../components";
import styles from "../assets/styles";
import IMAGE_NOJOBS from "../assets/images/noJobs.jpg";
import api from "../assets/services/api";
import { AxiosResponse } from 'axios';
import { DataT } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  const [listCard, setListCard] = useState([]);

  useEffect(() => {
    api.get("/getCards").then((response: AxiosResponse) => {
      setListCard(response.data);
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
              <Card key={"" + job.idPosition}>
                <CardItem
                  hasActions
                  image={{uri: job.landscapeLink}}
                  name={job.name}
                  description={job.description}
                  matches={job.match}
                />
              </Card>
            ))}
          </CardStack>
        </View>
      </ImageBackground>
  );
};

export default Home;
