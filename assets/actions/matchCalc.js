import { useEffect, useState } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const [profile, setProfile] = useState();

AsyncStorage.getItem("user", (err, result) => {
  if (!err && result != null){
    setProfile(JSON.parse(result));
  }
});

let compareData;

function calcMatch(id) {

    useEffect(() => {
        api.post("/getRequiredLanguage", {
          idPosition: id,
        }).then((response) => {
          api.post("/getLanguage", {
            idLanguage: response.data.Language_idLanguage,
          }).then((response) => {
            compareData.LanguageTitle = response.data.title;
            compareData.LanguageLevel = response.data.level;
          });
        });
        api.post("/getRequiredSoftSkill", {
          idPosition: id,
        }).then((response) => {
          api.post("/getSoftSkill", {
            idSoftSkill: response.data.SoftSkill_idSoftSkill,
          }).then((response) => {
            compareData.softSkillTitle = response.data.title;
            compareData.softSkillLevel = response.data.level;
          });
        });
        api.post("/getRequiredExperience", {
          idPosition: id,
        }).then((response) => {
          api.post("/getExperience", {
            idExperience: response.data.Experience_idExperience,
          }).then((response) => {
            compareData.experienceYears = response.data.years;
            api.post("/getArea", {
              idArea: response.data.idArea,
            }).then((response) => {
              compareData.experienceArea = response.data.name;
            });
          });
        });
      }, []);

    if(profile != undefined)
    {
      let matchValue;

      let text;

      let language;
      let lvlLanguage;
      let paragraph = profile[1].split(/\r?\n/);

      paragraph.forEach(element => {
        text = element.replace(/\s/g, '').Split('(');
        language.push(text[0]);
        lvlLanguage.push(text[1].replace(')', ''));
      });

      text = profile[2].replace(/\s/g, '').Split('(');
      const scholarity = text[0];
      const scholarityStatus = text[1].replace(')', '')

      let experience;
      let lvlExperience;
      paragraph = profile[3].split(/\r?\n/);

      paragraph.forEach(element => {
        text = element.replace(/\s/g, '').Split('(');
        experience.push(text[0]);
        lvlExperience.push(text[1].replace(')', ''));
      });

      let softskill;
      let lvlSoftSkill;
      paragraph = profile[4].split(/\r?\n/);

      paragraph.forEach(element => {
        text = element.replace(/\s/g, '').Split('(');
        softskill.push(text[0]);
        lvlSoftSkill.push(text[1].replace(')', ''));
      });
      
      language.forEach(element => {
        if (element.search(compareData.LanguageTitle) > -1) {
          matchValue += 12.5;
        }
      });

      LanguageLevel.forEach(element => {
        if (element.search(compareData.LanguageLevel) > -1) {
          matchValue += 12.5;
        }
      });

      experience.forEach(element => {
        if (element.search(compareData.experienceArea) > -1) {
          matchValue += 12.5;
        }
      }); 
      
      lvlExperience.forEach(element => {
        if (element.search(compareData.experienceYears) > -1) {
          matchValue += 12.5;
        }
      });

      softskill.forEach(element => {
        if (element.search(compareData.softSkillTitle) > -1) {
          matchValue += 12.5;
        }
      });

      softSkillLevel.forEach(element => {
        if (element.search(compareData.softSkillTitle) > -1) {
          matchValue += 12.5;
        }
      });

      if(scholarity.equals(compareData.scholarityTitle)) {
        matchValue += 12.5;
      }

      if(scholarityStatus.equals(compareData.scholarityLevel)) {
        matchValue += 12.5;
      }

      return matchValue;
    }
    return 0.0;
}

export default calcMatch;