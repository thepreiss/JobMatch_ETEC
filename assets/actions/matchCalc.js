import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function convertLanguage(language) {
  switch (language) {
    case "Inglês":
      return 1;
    case "Espanhol":
      return 2;
    case "Francês":
      return 3;
    case "Alemão":
      return 4;
    case "Mandarim":
      return 5;
    case "Português":
      return 6;
    default:
      return "Não cadastrado";
  }
}

function convertLanguageLvl(languageLvl) {
  switch (languageLvl) {
    case "Básico":
      return 1;
    case "Intermediário":
      return 2;
    case "Avançado":
      return 3;
    case "Fluente":
      return 4;
    default:
      return "Não cadastrado";
  }
}

function convertScholarity(scholarity) {
  switch (scholarity) {
    case "Ensinofundamental":
      return 1;
    case "Ensinomédio":
      return 2;
    case "Ensinotécnico":
      return 3;
    case "Graduação":
      return 4;
    case "Pós-graduação":
      return 5;
    default:
      return "Não cadastrado";
  }
}

function convertScholarityLvl(scholarityLvl) {
  switch (scholarityLvl) {
    case "Incompleto":
      return 1;
    case "Completo":
      return 2;
    default:
      return "Não cadastrado";
  }
}

function convertExperience(experience) {
  switch (experience) {
    case "Administração":
      return 1;
    case "DesenvolvimentodeSoftware":
      return 2;
    case "RecursosHumanos":
      return 3;
    case "Gestãodepessoas":
      return 4;
    case "Operacional":
      return 5;
    case "ServiçosdeTI":
      return 6;
    case "Ensino":
      return 7;
    default:
      return "Não cadastrado";
  }
}

function convertExperienceLvl(experienceLvl) {
  switch (experienceLvl) {
    case "Atéumano":
      return 1;
    case "Até3anos":
      return 2;
    case "Até5anos":
      return 3;
    case "Maisde5anos":
      return 4;
    default:
      return "Não cadastrado";
  }
}

function convertSoftSkill(softskill) {
  switch (softskill) {
    case "InteligênciaEmocional":
      return 1;
    case "Comunicação":
      return 2;
    case "Gestãodotempo":
      return 3;
    case "Liderança":
      return 4;
    case "Flexibilidadeeadaptabilidade":
      return 5;
    case "Trabalhoemequipe":
      return 6;
    case "Espíritoempreendedor":
      return 7;
    default:
      return "Não cadastrado";
  }
}

function convertSoftSkillLevel(softskillLvl) {
  switch (softskillLvl) {
    case "Nível1":
      return 1;
    case "Nível2":
      return 2;
    case "Nível3":
      return 3;
    case "Nível4":
      return 4;
    case "Nível5":
      return 5;
    default:
      return "Não cadastrado";
  }
}

async function calcMatch(id) {
  let profile;
  let matchValue = 0;

  await AsyncStorage.getItem("user", (err, result) => {
  if (!err && result != null){
    profile = JSON.parse(result);
  }
  });

  if(profile != undefined)
  {

    let text;

    let language = [];
    let lvlLanguage = [];
    let paragraph = profile[1].split(/\r?\n/);

    paragraph.forEach(element => {
      text = element.replace(/\s/g, '').split('(');
      language.push(text[0]);
      lvlLanguage.push(text[1].replace(')', ''));
    });

    text = profile[2].replace(/\s/g, '').split('(');
    const scholarity = text[0];
    const scholarityStatus = text[1].replace(')', '')

    let experience = [];
    let lvlExperience = [];
    paragraph = profile[3].split(/\r?\n/);

    paragraph.forEach(element => {
      text = element.replace(/\s/g, '').split('(');
      experience.push(text[0]);
      lvlExperience.push(text[1].replace(')', ''));
    });

    let softskill = [];
    let lvlSoftSkill = [];
    paragraph = profile[4].split(/\r?\n/);

    paragraph.forEach(element => {
      text = element.replace(/\s/g, '').split('(');
      softskill.push(text[0]);
      lvlSoftSkill.push(text[1].replace(')', ''));
    });
  
    let cLanguage = [];
    language.forEach(element => {
      cLanguage.push(convertLanguage(element));
    });
  
    let cLanguageLvl = [];
    lvlLanguage.forEach(element => {
      cLanguageLvl.push(convertLanguageLvl(element));
    });
  
    let cScholarity = convertScholarity(scholarity);
    let cScholarityLvl = convertScholarityLvl(scholarityStatus);

    let cExperience = [];
    experience.forEach(element => {
      cExperience.push(convertExperience(element));
    });

    let cExperienceLvl = [];
    lvlExperience.forEach(element => {
      cExperienceLvl.push(convertExperienceLvl(element));
    });

    let cSoftSkill = [];
    softskill.forEach(element => {
      cSoftSkill.push(convertSoftSkill(element));
    });

    let cSoftSkillLvl = [];
    lvlSoftSkill.forEach(element => {
      cSoftSkillLvl.push(convertSoftSkillLevel(element));
    });

    const transactionCalc = [
      {
        positionId: id,
        language: cLanguage,
        laguageLvl: cLanguageLvl,
        scholarity: cScholarity,
        scholarityLvl: cScholarityLvl,
        experience: cExperience,
        experienceLvl: cExperienceLvl,
        softskill: cSoftSkill,
        softskillLvl: cSoftSkillLvl,
      }
    ];

    api.get("/calcMatch").then((response) => {
      return JSON.parse(response);
    });

    //console.log("Montado o retorno: " + transactionCalc[0].positionId);  
  };

  return 0;
}

export default calcMatch;