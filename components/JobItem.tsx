import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import { DataC } from "../types";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";

const JobItem = ({
  info1,
  info2,
  info3,
  info4,
  info5,
  description,
  image,
  name,
}: DataC) => (
  <View style={styles.containerProfileItem}>
    <View style={styles.nameProfileItem}>
      <Text style={styles.nameTextProfileItem}>
        {name}
      </Text>
    </View>

    <Text style={styles.descriptionProfileItem}>
      {description}
    </Text>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Icon name="language-outline" size={16} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info1}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Icon name="school-outline" size={16} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info2}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Icon name="business-outline" size={16} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info3}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Icon name="star-outline" size={16} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info4}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Icon name="analytics-outline" size={16} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info5}</Text>
    </View>
  </View>
);

export default JobItem;
