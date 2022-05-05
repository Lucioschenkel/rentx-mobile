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
  SchedulingComplete: {
    id: string;
  };
  MyCars: {
    id: string;
  };
};
