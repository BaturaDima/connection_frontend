import { useMemo } from 'react';

function useSortedByTime<T>(data: T[], timeExtractor: (item: T) => Date) {
  return useMemo(() => {
    return data
      .slice()
      .sort(
        (firstItem, secondItem) =>
          timeExtractor(secondItem).getTime() -
          timeExtractor(firstItem).getTime(),
      );
  }, [data]);
}

export default useSortedByTime;
