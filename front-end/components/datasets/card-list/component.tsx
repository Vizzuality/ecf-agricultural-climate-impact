import { FC } from 'react';

// components
import { Dataset } from 'types';

import DatasetListItem from '../card-item';

export interface DatasetCardListProps {
  list: Dataset[];
  expandedChart?: boolean;
}

export const DatasetCardList: FC<DatasetCardListProps> = ({ list }: DatasetCardListProps) => (
  <>
    {list.map((dataset) => (
      <div className="mt-2.5 first:mt-0" key={dataset.id}>
        <DatasetListItem
          dataset={dataset}
          layer={dataset?.layer?.[0]}
          metadata={dataset.metadata}
        />
      </div>
    ))}
  </>
);

export default DatasetCardList;
