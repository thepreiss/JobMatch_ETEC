import React, {useState} from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../assets/styles";
import people from "../assets/data/persons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

function register() {

}

const Profile = () => {
  const [registerModalActive, setregisterModalActive] = useState(false);
  const [modalNomeVisible, setModalNomeVisible] = useState(false);
  const [modalScholarityVisible, setModalScholarityVisible] = useState(false);
  const [modalLanguage1Visible, setModalLanguage1Visible] = useState(false);
  const [modalMoreLanguagesVisible, setModalMoreLanguagesVisible] = useState(false);
  const [modalLanguage2Visible, setModalLanguage2Visible] = useState(false);
  const [modalLanguage3Visible, setModalLanguage3Visible] = useState(false);
  const [modalExperience1Visible, setModalExperience1Visible] = useState(false);
  const [modalMoreExperiencesVisible, setModalMoreExperiencesVisible] = useState(false);
  const [modalExperience2Visible, setModalExperience2Visible] = useState(false);
  const [modalExperience3Visible, setModalExperience3Visible] = useState(false);

  const [name, setName] = useState();
  const [scholarity, setScholarity] = useState('Unknown');
  const [statusScholarity, setStatusScholarity] = useState('Unknown');
  const [language1, setLanguage1] = useState();
  const [language1Level, setLanguage1Level] = useState();
  const [language2, setLanguage2] = useState();
  const [language2Level, setLanguage2Level] = useState();
  const [language3, setLanguage3] = useState();
  const [language3Level, setLanguage3Level] = useState();
  const [experience1, setExperience1] = useState();
  const [experience1Time, setExperience1Time] = useState();
  const [experience2, setExperience2] = useState();
  const [experience2Time, setExperience2Time] = useState();
  const [experience3, setExperience3] = useState();
  const [experience3Time, setExperience3Time] = useState();
  const [softSkill1, setSoftSkill1] = useState();
  const [softSkill1Level, setSoftSkill1Level] = useState();
  const [softSkill2, setSoftSkill2] = useState();
  const [softSkill2Level, setSoftSkill2Level] = useState();
  const [softSkill3, setSoftSkill3] = useState();
  const [softSkill3Level, setSoftSkill3Level] = useState();

  const data = people[0];
  AsyncStorage.setItem('initialPeople', JSON.stringify(data));

  AsyncStorage.getItem('registred', (err, result) => {
    if (!err && result != null){
      data.name = result.name;
      //data.image = result.image;
      data.info1 = result.info1;
      data.info2 = result.info2;
      data.info3 = result.info3;
      data.info4 = result.info4;
      data.info5 = result.info5;
    }
    else if(!modalNomeVisible) {
      if(!registerModalActive)
      {
        Alert.alert('Bem-Vindo!', 'Você poderá explorar após se cadastrar!', [
          {
            text: 'OK',
            onPress: () => setModalNomeVisible(true),
            style: 'ok',
          },
        ]);
      }
    }
  });

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNomeVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Qual é o seu nome?</Text>
            <TextInput
              style={styles.input}
              id="name"
              placeholder="Nome de exibição"
              keyboardType="default"
              onChangeText={setName}
            />
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                  if (name == undefined) {
                    Alert.alert('Dado não preenchido', 'Você precisa fornecer o dado solicitado!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalNomeVisible(false);
                    setregisterModalActive(true);
                    setModalScholarityVisible(true);
                  }
                }
              }>
              <Text style={styles.textStyle}>Avançar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalScholarityVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Qual é seu nível de escolaridade?</Text>
            <Picker
              selectedValue={scholarity}
              onValueChange={(value, index) => setScholarity(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a escolaridade" value="Unknown" />
              <Picker.Item label="Ensino fundamental" value="Ensino fundamental" />
              <Picker.Item label="Ensino médio" value="Ensino médio" />
              <Picker.Item label="Graduação" value="Graduação" />
              <Picker.Item label="Pós-graduação" value="Pós-graduação" />
            </Picker>
            <Picker
              selectedValue={statusScholarity}
              onValueChange={(value, index) => setStatusScholarity(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a situação da sua formação" value="Unknown" />
              <Picker.Item label="Incompleta" value="0" />
              <Picker.Item label="Completa" value="1" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (scholarity == "Unknown" || statusScholarity == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalScholarityVisible(false);
                    setModalLanguage1Visible(true);
                  }
                }
              }>
              <Text style={styles.textStyle}>Avançar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLanguage1Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui algum dos idiomas listados? Você poderá indicar até 3.</Text>
            <Picker
              selectedValue={language1}
              onValueChange={(value, index) => setLanguage1(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione o idioma" value="Unknown" />
              <Picker.Item label="Inglês" value="Inglês" />
              <Picker.Item label="Espanhol" value="Espanhol" />
              <Picker.Item label="Francês" value="Francês" />
              <Picker.Item label="Alemão" value="Alemão" />
              <Picker.Item label="Mandarim" value="Mandarim" />
              <Picker.Item label="Português" value="Português" />
            </Picker>
            <Picker
              selectedValue={language1Level}
              onValueChange={(value, index) => setLanguage1Level(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione seu nível no idioma" value="Unknown" />
              <Picker.Item label="Básico" value="0" />
              <Picker.Item label="Intermediário" value="1" />
              <Picker.Item label="Avançado" value="2" />
              <Picker.Item label="Fluente" value="3" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (language1 == "Unknown" || language1Level == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalLanguage1Visible(false);
                    setModalMoreLanguagesVisible(true);
                  }
                }
              }>
              <Text style={styles.textStyle}>Avançar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMoreLanguagesVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você deseja cadastrar mais idiomas?</Text>
            <Pressable
              style={styles.buttonOpenGreen}
              onPress={() => {
                setModalMoreLanguagesVisible(false);
                  if(language2 != undefined) {
                    setModalLanguage3Visible(true);
                  } else {
                    setModalLanguage2Visible(true);
                  }                  
                }
              }>
              <Text style={styles.textStyle}>Sim</Text>
            </Pressable>
            <Pressable
              style={styles.buttonOpenRed}
              onPress={() => {
                  setModalMoreLanguagesVisible(false);
                }
              }>
              <Text style={styles.textStyle}>Não</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLanguage2Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui algum dos idiomas listados?</Text>
            <Picker
              selectedValue={language2}
              onValueChange={(value, index) => setLanguage2(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione o idioma" value="Unknown" />
              <Picker.Item label="Inglês" value="Inglês" />
              <Picker.Item label="Espanhol" value="Espanhol" />
              <Picker.Item label="Francês" value="Francês" />
              <Picker.Item label="Alemão" value="Alemão" />
              <Picker.Item label="Mandarim" value="Mandarim" />
              <Picker.Item label="Português" value="Português" />
            </Picker>
            <Picker
              selectedValue={language2Level}
              onValueChange={(value, index) => setLanguage2Level(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione seu nível no idioma" value="Unknown" />
              <Picker.Item label="Básico" value="0" />
              <Picker.Item label="Intermediário" value="1" />
              <Picker.Item label="Avançado" value="2" />
              <Picker.Item label="Fluente" value="3" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (language2 == "Unknown" || language2Level == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalLanguage2Visible(false);
                    setModalMoreLanguagesVisible(true);
                  }
                }
              }>
              <Text style={styles.textStyle}>Avançar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLanguage3Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui algum dos idiomas listados?</Text>
            <Picker
              selectedValue={language3}
              onValueChange={(value, index) => setLanguage3(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione o idioma" value="Unknown" />
              <Picker.Item label="Inglês" value="Inglês" />
              <Picker.Item label="Espanhol" value="Espanhol" />
              <Picker.Item label="Francês" value="Francês" />
              <Picker.Item label="Alemão" value="Alemão" />
              <Picker.Item label="Mandarim" value="Mandarim" />
              <Picker.Item label="Português" value="Português" />
            </Picker>
            <Picker
              selectedValue={language3Level}
              onValueChange={(value, index) => setLanguage3Level(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione seu nível no idioma" value="Unknown" />
              <Picker.Item label="Básico" value="0" />
              <Picker.Item label="Intermediário" value="1" />
              <Picker.Item label="Avançado" value="2" />
              <Picker.Item label="Fluente" value="3" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (language3 == "Unknown" || language3Level == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalLanguage3Visible(false);
                  }
                }
              }>
              <Text style={styles.textStyle}>Avançar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri: data.image}} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>
            
          </View>
        </ImageBackground>

        <ProfileItem
          name={data.name}
          info1={data.info1}
          info2={data.info2}
          info3={data.info3}
          info4={data.info4}
          info5={data.info5}
        />

      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
