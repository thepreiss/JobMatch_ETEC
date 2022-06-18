import { DataP } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

let nameServer = "Novo usuário";
let info1Server = "Novo usuário";
let info2Server = "Novo usuário";
let info3Server = "Novo usuário";
let info4Server ="Novo usuário";

AsyncStorage.getItem("user", (err, result) => {
  if (!err && result != null){
    let storageData = JSON.parse(result);
  
    nameServer = storageData.name;
    //data.image = result.image;
    info1Server = storageData.info1;
    info2Server = storageData.info2;
    info3Server = storageData.info3;
    info4Server = storageData.info4;
  }
});

let persons: DataP[] = [
  {
    id: 1,
    name: nameServer,
    description:
      "",
    info1: info1Server,
    info2: info2Server,
    info3: info3Server,
    info4: info4Server,
    image: "https://images2.imgbox.com/7d/6a/ZkZefOT8_o.png",
  },
];

export default persons;