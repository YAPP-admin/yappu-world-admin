import axiosInstance from '../common/axiosInstance.ts';
import { GetSampleDataRes } from './sampleTypes.ts';

export const getSampleData = () =>
  axiosInstance.get<GetSampleDataRes>('/api/sample');
