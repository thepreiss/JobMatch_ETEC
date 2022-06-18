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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import {Restart} from 'fiction-expo-restart';

function convertLanguageLevel(level) {
  switch (level) {
    case "0":
      return "Básico"
    case "1":
      return "Intermediário"
    case "2":
      return "Avançado"
    default:
      return "Fluente"
  }
}

function convertScholarityStatus(status) {
  switch (status) {
    case "0":
      return "Incompleto"
    case "1":
      return "Completo"
  }
}

function convertExperienceTime(time) {
  switch (time) {
    case "1":
      return "Até um ano"
    case "3":
      return "Até 3 anos"
    case "5":
      return "Até 5 anos"
    default:
      return "Mais de 5 anos"
  }
}

function convertSoftSkillLevel(level) {
  switch (level) {
    case "1":
      return "Nível 1"
    case "2":
      return "Nível 2"
    case "3":
      return "Nível 3"
    case "4":
      return "Nível 4"
    default:
      return "Nível 5"
  }
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
  const [modalSoftSkill1Visible, setModalSoftSkill1Visible] = useState(false);
  const [modalMoreSoftSkillsVisible, setModalMoreSoftSkillsVisible] = useState(false);
  const [modalSoftSkill2Visible, setModalSoftSkill2Visible] = useState(false);
  const [modalSoftSkill3Visible, setModalSoftSkill3Visible] = useState(false);

  const [name, setName] = useState();
  const [scholarity, setScholarity] = useState();
  const [statusScholarity, setStatusScholarity] = useState();
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
  const [data, setData] = useState();
  const [storageControl, setStorageControl] = useState(false);

  AsyncStorage.getItem("user", (err, result) => {
    if (!err && result != null){
      setData(JSON.parse(result));
    } else if(!modalNomeVisible) {
      if(!registerModalActive)
      {
        Alert.alert('Bem-Vindo!', 'Você poderá explorar após se cadastrar!', [
          {
            text: 'OK',
            onPress: () => setModalNomeVisible(true),
            style: 'ok',
          },
        ]);
      } else if (storageControl){

        let persons = [];

        persons.push(name);

        let language = "" + language1 + " (" + convertLanguageLevel(language1Level) + ")";
        if (language2 != null && language2 != undefined) {
          language += "\n" + language2 + " (" + convertLanguageLevel(language2Level) + ")";
          if (language3 != null && language3 != undefined) {
            language += "\n" + language3Level + " (" + convertLanguageLevel(language3Level) + ")";
          }
        }

        persons.push(language);

        persons.push("" + scholarity + " (" + convertScholarityStatus(statusScholarity) + ")");

        let experience;
        if (experience1 == "") {
          experience = "Sem experiência";
        } else {
          experience = "" + experience1 + " - " + convertExperienceTime(experience1Time);
          if (experience2 != null && experience2 != undefined) {
            experience += "\n" + experience2 + " - " + convertExperienceTime(experience2Time);
            if (experience3 != null && experience3 != undefined) {
              experience += "\n" + experience3 + " - " + convertExperienceTime(experience3Time);
            }
          }
        }

        persons.push(experience);

        let soft;
        if (softSkill1 == "") {
          soft = "Sem softSkill";
        } else {
          soft = "" + softSkill1 + " - " + convertSoftSkillLevel(softSkill1Level);
          if (softSkill2 != null && softSkill2 != undefined) {
            soft += "\n" + softSkill2 + " - " + convertSoftSkillLevel(softSkill2Level);
            if (softSkill3 != null && softSkill3 != undefined) {
              soft += "\n" + softSkill3 + " - " + convertSoftSkillLevel(softSkill3Level);
            }
          }
        } 
        persons.push(soft);

        AsyncStorage.setItem("user", JSON.stringify(persons));
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
                  setModalExperience1Visible(true);
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
                    setModalExperience1Visible(true);
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
        visible={modalExperience1Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui experiência em alguma das áreas listadas? Você pode indicar até 3.</Text>
            <Picker
              selectedValue={experience1}
              onValueChange={(value, index) => setExperience1(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a área" value="Unknown" />
              <Picker.Item label="Administração" value="Administração" />
              <Picker.Item label="Desenvolvimento de Software" value="Desenvolvimento de Software" />
              <Picker.Item label="Recursos Humanos" value="Recursos Humanos" />
              <Picker.Item label="Gestão de pessoas" value="Gestão de pessoas" />
              <Picker.Item label="Operacional" value="Operacional" />
              <Picker.Item label="Serviços de TI" value="Serviços de TI" />
              <Picker.Item label="Ensino" value="Ensino" />
              <Picker.Item label="Sem experiência" value="" />
            </Picker>
            <Picker
              selectedValue={experience1Time}
              onValueChange={(value, index) => setExperience1Time(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione quantos anos de experiência" value="Unknown" />
              <Picker.Item label="Até 1 ano" value="1" />
              <Picker.Item label="Até 3 anos" value="3" />
              <Picker.Item label="Até 5 anos" value="5" />
              <Picker.Item label="Mais de 5 anos" value="6" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if(experience1 == "") {
                  setModalExperience1Visible(false);
                  setExperience1Time("");
                  setModalSoftSkill1Visible(true);
                } else if (experience1 == "Unknown" || experience1Time == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalExperience1Visible(false);
                    setModalMoreExperiencesVisible(true);
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
        visible={modalMoreExperiencesVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você deseja cadastrar mais outra experiência?</Text>
            <Pressable
              style={styles.buttonOpenGreen}
              onPress={() => {
                setmodalMoreExperiencesVisible(false);
                  if(experience2 != undefined) {
                    setModalExperience3Visible(true);
                  } else {
                    setModalExperience2Visible(true);
                  }                  
                }
              }>
              <Text style={styles.textStyle}>Sim</Text>
            </Pressable>
            <Pressable
              style={styles.buttonOpenRed}
              onPress={() => {
                  setModalMoreExperiencesVisible(false);
                  setModalSoftSkill1Visible(true);
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
        visible={modalExperience2Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui experiência em alguma das áreas listadas?</Text>
            <Picker
              selectedValue={experience2}
              onValueChange={(value, index) => setExperience2(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a área" value="Unknown" />
              <Picker.Item label="Administração" value="Administração" />
              <Picker.Item label="Desenvolvimento de Software" value="Desenvolvimento de Software" />
              <Picker.Item label="Recursos Humanos" value="Recursos Humanos" />
              <Picker.Item label="Gestão de pessoas" value="Gestão de pessoas" />
              <Picker.Item label="Operacional" value="Operacional" />
              <Picker.Item label="Serviços de TI" value="Serviços de TI" />
              <Picker.Item label="Ensino" value="Ensino" />
            </Picker>
            <Picker
              selectedValue={experience2Time}
              onValueChange={(value, index) => setExperience2Time(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione quantos anos de experiência" value="Unknown" />
              <Picker.Item label="Até 1 ano" value="1" />
              <Picker.Item label="Até 3 anos" value="3" />
              <Picker.Item label="Até 5 anos" value="5" />
              <Picker.Item label="Mais de 5 anos" value="6" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (experience2 == "Unknown" || experience2Time == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalExperience2Visible(false);
                    setModalMoreExperiencesVisible(true);
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
        visible={modalExperience3Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui experiência em alguma das áreas listadas?</Text>
            <Picker
              selectedValue={experience3}
              onValueChange={(value, index) => setExperience3(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a área" value="Unknown" />
              <Picker.Item label="Administração" value="Administração" />
              <Picker.Item label="Desenvolvimento de Software" value="Desenvolvimento de Software" />
              <Picker.Item label="Recursos Humanos" value="Recursos Humanos" />
              <Picker.Item label="Gestão de pessoas" value="Gestão de pessoas" />
              <Picker.Item label="Operacional" value="Operacional" />
              <Picker.Item label="Serviços de TI" value="Serviços de TI" />
              <Picker.Item label="Ensino" value="Ensino" />
            </Picker>
            <Picker
              selectedValue={experience3Time}
              onValueChange={(value, index) => setExperience3Time(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione quantos anos de experiência" value="Unknown" />
              <Picker.Item label="Até 1 ano" value="1" />
              <Picker.Item label="Até 3 anos" value="3" />
              <Picker.Item label="Até 5 anos" value="5" />
              <Picker.Item label="Mais de 5 anos" value="6" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (experience3 == "Unknown" || experience3Time == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalExperience3Visible(false);
                    setModalSoftSkill1Visible(true);
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
        visible={modalSoftSkill1Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui alguma das SoftSkills listadas? Você pode indicar até 3.</Text>
            <Picker
              selectedValue={softSkill1}
              onValueChange={(value, index) => setSoftSkill1(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a skill" value="Unknown" />
              <Picker.Item label="Inteligência Emocional" value="Inteligência Emocional" />
              <Picker.Item label="Comunicação" value="Comunicação" />
              <Picker.Item label="Gestão do tempo" value="Gestão do tempo" />
              <Picker.Item label="Liderança" value="Liderança" />
              <Picker.Item label="Flexibilidade e adaptabilidade" value="Flexibilidade e adaptabilidade" />
              <Picker.Item label="Trabalho em equipe" value="Trabalho em equipe" />
              <Picker.Item label="Espírito empreendedor" value="Espírito empreendedor" />
              <Picker.Item label="Sem skill" value="" />
            </Picker>
            <Picker
              selectedValue={softSkill1Level}
              onValueChange={(value, index) => setSoftSkill1Level(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione qual seu nível de habilidade" value="Unknown" />
              <Picker.Item label="Nível 1" value="1" />
              <Picker.Item label="Nível 2" value="2" />
              <Picker.Item label="Nível 3" value="3" />
              <Picker.Item label="Nível 4" value="4" />
              <Picker.Item label="Nível 5" value="5" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (softSkill1 == "") {
                  setSoftSkill1Level("");
                  setStorageControl(true);
                  setModalSoftSkill1Visible(false);
                  Alert.alert('Cadastro concluído!', 'Você concluiu o registro e poderá utilizar o aplicativo.', [
                    {
                      text: 'Legal!',
                      style: 'ok',
                    },
                  ]);
                } else if (softSkill1 == "Unknown" || softSkill1Level == "Unknown"){
                  Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                    {
                      text: 'OK',
                      style: 'ok',
                    },
                  ]);
                } else {
                  setModalSoftSkill1Visible(false);
                  setModalMoreSoftSkillsVisible(true);
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
        visible={modalMoreSoftSkillsVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você deseja cadastrar mais outra SoftSkill?</Text>
            <Pressable
              style={styles.buttonOpenGreen}
              onPress={() => {
                setModalMoreSoftSkillsVisible(false);
                  if(softSkill2 != undefined) {
                    setModalSoftSkill3Visible(true);
                  } else {
                    setModalSoftSkill2Visible(true);
                  }                  
                }
              }>
              <Text style={styles.textStyle}>Sim</Text>
            </Pressable>
            <Pressable
              style={styles.buttonOpenRed}
              onPress={() => {
                  setStorageControl(true);
                  setModalMoreSoftSkillsVisible(false);
                  Alert.alert('Cadastro concluído!', 'Você concluiu o registro e poderá utilizar o aplicativo.', [
                    {
                      text: 'Legal!',
                      style: 'ok',
                    },
                  ]);
                  Restart();
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
        visible={modalSoftSkill2Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui alguma das SoftSkills listadas?</Text>
            <Picker
              selectedValue={softSkill2}
              onValueChange={(value, index) => setSoftSkill2(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a skill" value="Unknown" />
              <Picker.Item label="Inteligência Emocional" value="Inteligência Emocional" />
              <Picker.Item label="Comunicação" value="Comunicação" />
              <Picker.Item label="Gestão do tempo" value="Gestão do tempo" />
              <Picker.Item label="Liderança" value="Liderança" />
              <Picker.Item label="Flexibilidade e adaptabilidade" value="Flexibilidade e adaptabilidade" />
              <Picker.Item label="Trabalho em equipe" value="Trabalho em equipe" />
              <Picker.Item label="Espírito empreendedor" value="Espírito empreendedor" />
            </Picker>
            <Picker
              selectedValue={softSkill2Level}
              onValueChange={(value, index) => setSoftSkill2Level(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione qual seu nível de habilidade" value="Unknown" />
              <Picker.Item label="Nível 1" value="1" />
              <Picker.Item label="Nível 2" value="2" />
              <Picker.Item label="Nível 3" value="3" />
              <Picker.Item label="Nível 4" value="4" />
              <Picker.Item label="Nível 5" value="5" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (softSkill2 == "Unknown" || softSkill2Level == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalSoftSkill2Visible(false);
                    setModalMoreSoftSkillsVisible(true);
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
        visible={modalSoftSkill3Visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Você possui alguma das SoftSkills listadas?</Text>
            <Picker
              selectedValue={softSkill3}
              onValueChange={(value, index) => setSoftSkill3(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione a skill" value="Unknown" />
              <Picker.Item label="Inteligência Emocional" value="Inteligência Emocional" />
              <Picker.Item label="Comunicação" value="Comunicação" />
              <Picker.Item label="Gestão do tempo" value="Gestão do tempo" />
              <Picker.Item label="Liderança" value="Liderança" />
              <Picker.Item label="Flexibilidade e adaptabilidade" value="Flexibilidade e adaptabilidade" />
              <Picker.Item label="Trabalho em equipe" value="Trabalho em equipe" />
              <Picker.Item label="Espírito empreendedor" value="Espírito empreendedor" />
            </Picker>
            <Picker
              selectedValue={softSkill3Level}
              onValueChange={(value, index) => setSoftSkill3Level(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="Selecione qual seu nível de habilidade" value="Unknown" />
              <Picker.Item label="Nível 1" value="1" />
              <Picker.Item label="Nível 2" value="2" />
              <Picker.Item label="Nível 3" value="3" />
              <Picker.Item label="Nível 4" value="4" />
              <Picker.Item label="Nível 5" value="5" />
            </Picker>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => {
                if (softSkill3 == "Unknown" || softSkill3Level == "Unknown") {
                    Alert.alert('Dado não selecionado', 'Você precisa fornecer os dados solicitados!', [
                      {
                        text: 'OK',
                        style: 'ok',
                      },
                    ]);
                  } else {
                    setModalSoftSkill3Visible(false);
                    setStorageControl(true);
                    Alert.alert('Cadastro concluído!', 'Você concluiu o registro e poderá utilizar o aplicativo.', [
                      {
                        text: 'Legal!',
                        style: 'ok',
                      },
                    ]);
                    Restart();
                  }
                }
              }>
              <Text style={styles.textStyle}>Concluir</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri: "https://images2.imgbox.com/7d/6a/ZkZefOT8_o.png"}} style={styles.photo}>
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
          name={ data && (data.length > 0) ? data[0] : "Novo usuário" }
          info1={ data && (data.length > 0) ? data[1] : "Novo usuário" }
          info2={ data && (data.length > 0) ? data[2] : "Novo usuário" }
          info3={ data && (data.length > 0) ? data[3] : "Novo usuário" }
          info4={ data && (data.length > 0) ? data[4] : "Novo usuário" }
        />

      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
