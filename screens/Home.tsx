import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CardItem } from "../components";
import styles from "../assets/styles";
import IMAGE_NOJOBS from "../assets/images/noJobs.jpg";
import Jobs from "../assets/data/jobs";

const Home = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);

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
                name="Não há mais posições disponíveis. Atualize ou volte mais tarde :)"
                image={IMAGE_NOJOBS}
              />
            </Card>
          }
            ref={(newSwiper): void => setSwiper(newSwiper)}
          >
            {Jobs.map((item) => (
              <Card key={item.id}>
                <CardItem
                  hasActions
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  matches={item.match}
                />
              </Card>
            ))}
          </CardStack>
        </View>
      </ImageBackground>
  );
};

export default Home;
