import React from "react";
import { Text, View, Button } from "react-native";
import Icon from "./Icon";
import { ProfileItemT } from "../types";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";

const ProfileItem = ({
  info1,
  info2,
  info3,
  info4,
  info5,
  name,
}: ProfileItemT) => (
  <View style={styles.containerProfileItem}>
    <View style={styles.nameProfileItem}>
      <Text style={styles.nameTextProfileItem}>
        {name}
      </Text>
    </View>

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

  </View>
);

export default ProfileItem;
