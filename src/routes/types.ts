import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  Home: {
    id: string;
  };
  CarDetails: {
    id: string;
    car: CarDTO;
  };
  Scheduling: {
    id: string;
    car?: CarDTO;
  };
  SchedulingDetails: {
    id: string;
    car?: CarDTO;
    dates: string[];
  };
  Confirmation: {
    id: string;
    title: string;
    message: string;
    nextScreenRoute: string;
  };
  MyCars: {
    id: string;
  };
  SignIn: {
    id: string;
  };
  SignUpFirstStep: {
    id: string;
  };
  SignUpSecondStep: {
    id: string;
    user: {
      email: string;
      name: string;
      driversLicense: string;
    };
  };
};
