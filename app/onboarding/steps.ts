import { ImageSourcePropType } from "react-native";

interface OnBoardingStep {
    title: string;
    text: string;
    image: ImageSourcePropType;
}

const steps: OnBoardingStep[] = [
  {
    title: 'O lixo não será mais um problema.',
    text: 'Sabemos que ele está presente em todas as cidades e o econecta está aqui para ajudá-lo a manter a sua mais limpa.',
    image: require('@/assets/illustrations/onboarding/step-1.png'),
  },
  {
    title: 'Simplificamos tudo para você.',
    text: 'O econecta detecta sua posição automaticamente e a insere em seu relato de foco de lixo, facilitando o seu processo de envio.',
    image: require('@/assets/illustrations/onboarding/step-2.png'),
  },
  {
    title: 'Seu relato começa com uma foto.',
    text: 'Fotografar o foco de lixo é o primeiro passo para resolver os problemas com poluição em seu bairro.',
    image: require('@/assets/illustrations/onboarding/step-3.png'),
  },
  {
    title: 'Informações sobre focos de lixo.',
    text: 'Ter informações é ótimo para evidenciar aos órgãos públicos o problema. Quanto mais informações, mais chances de solução.',
    image: require('@/assets/illustrations/onboarding/step-4.png'),
  },
  {
    title: 'Fique ativo em uma comunidade.',
    text: 'Interaja com outras pessoas acerca do lixo descartado incorretamente em sua região.',
    image: require('@/assets/illustrations/onboarding/step-5.png'),
  },
]

export default steps