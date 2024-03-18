export type Data = {
  id: number;
  image: any;
  title: string;
  text: string;
};

export const data: Data[] = [
  {
    id: 1,
    image: require('../assets/onboarding/image1.png'),
    title: 'Welcome to TrafficPulse!',
    text: 'We open the door for you to explore boundless potential in every region. With our advanced traffic analysis, we help you identify strategic opportunities across various sectors. Let\'s start an adventure full of potential!',
  },
  {
    id: 2,
    image: require('../assets/onboarding/image2.png'),
    title: 'Explore Regional Potential',
    text: 'Discover advantages on every street and corner. With our traffic analysis, you can uncover strategic potential for businesses, education, and other sectors. Enjoy in-depth information and make data-driven decisions. Explore regional potential now!',
  },
  {
    id: 3,
    image: require('../assets/onboarding/image3.png'),
    title: 'Begin Your Strategic Adventure',
    text: 'You can understand the dynamics of traffic, the types of vehicles passing through an area, and how frequently it occurs. Start crafting data-driven strategies to conquer every challenge. Welcome to your strategic adventure!',
  },
  {
    id: 4,
    image: require('../assets/onboarding/image4.png'),
    title: "Let’s Start Your Journey!",
    text: ' ',
  },
];
