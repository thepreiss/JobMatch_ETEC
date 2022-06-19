import React, { useEffect } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
import styles, {
  WHITE,
} from "../assets/styles";

function convertAreaCode(idArea: string) {
  const check = parseInt(idArea);
  switch (check) {
    case 1:
      return "Administração";
    case 2:
      return "Desenvolvimento de Software";
    case 3:
      return "Recursos Humanos";
    case 4:
      return "Gestão de pessoas";
    case 5:
      return "Operacional";
    case 6:
      return "Serviços de TI";
    case 7:
      return "Ensino";
    default:
      console.log("Veio: " + idArea);
      return "Não cadastrado";
  }
}

const CardItem = ({
  description,
  hasActions,
  hasVariant,
  image,
  area,
  matches,
  name,
}: CardItemT) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: "#363636",
      fontSize: hasVariant ? 15 : 22,
    },
  ];  

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {matches}% Compatível no total
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}><Text style={ {fontWeight: "bold"} }>{name}</Text></Text>

      {/* DESCRIPTION */}
      <Text></Text>
      <Text style={styles.descriptionCardItem}>
          {area && description? "Área:\n"+ convertAreaCode(area) + "\n\nDescrição:\n" + description : ""}
      </Text>

      {/* ACTIONS */}
      {hasActions }
    </View>
  );
};

export default CardItem;
