import { GetSampleDataRes } from './sampleTypes.ts';
import axiosInstance from '../common/axiosInstance.ts';

export const getSampleData = () =>
  axiosInstance.get<GetSampleDataRes>('/api/sample');
