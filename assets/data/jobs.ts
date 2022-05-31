import { DataT } from "../../types";
import IMAGE_01 from "../images/01.jpg";
import IMAGE_02 from "../images/02.jpg";
import IMAGE_03 from "../images/03.jpg";

const data: DataT[] = [
  {
    id: 1,
    name: "Assistente de manutenção de computadores e máquinas de escrever",
    match: "78",
    description:
      "Tecnolgia",
    message:
      "Irá atuar com manutenção de equipamentos de informática e zelar pelo bom funcionamento.",
    image: IMAGE_01,
  },
  {
    id: 2,
    name: "Gerente de compras",
    match: "10",
    description:
      "Administrativa",
    message: "Gerenciar as compras.",
    image: IMAGE_02,
  },
  {
    id: 3,
    name: "Cantor",
    match: "100",
    description:
      "Artística",
    message:
      "Responsável por cantar e encantar.",
    image: IMAGE_03,
  },
];

export default data;
