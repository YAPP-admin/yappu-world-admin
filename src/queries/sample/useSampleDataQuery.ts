import { useQuery } from '@tanstack/react-query';

import { getSampleData } from '../../apis/sample/sampleAPI.ts';

const useSampleDataQuery = () =>
  useQuery({ queryKey: ['sample'], queryFn: () => getSampleData() });

export default useSampleDataQuery;
