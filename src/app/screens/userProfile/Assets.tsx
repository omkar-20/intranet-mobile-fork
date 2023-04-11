import React from 'react';
import {ScrollView} from 'react-native';

import DetailsCard from '../../components/profile/cardDetails';
import AssetView from '../../components/profile/assets/assetView';
import ErrorMessage from '../../components/ErrorMessage';

import {AssetType} from '../../types';

const currentAssetsLabels = ['Name', 'Start Date', 'Is Active'];
const previousAssetsLabels = ['Name', 'Start Date', 'End Date', 'Is Active'];

type Props = {
  data: {
    currentAsset: AssetType[];
    previousAsset: AssetType[];
  };
};

const Asset = ({data}: Props) => {
  return (
    <ScrollView>
      <DetailsCard title="Current Assets">
        {data.currentAsset?.length ? (
          <AssetView labels={currentAssetsLabels} assets={data.currentAsset} />
        ) : (
          <ErrorMessage data="Current Assets" />
        )}
      </DetailsCard>

      {data.previousAsset?.length ? (
        <DetailsCard title="Previous Assets">
          <AssetView
            labels={previousAssetsLabels}
            assets={data.previousAsset}
          />
        </DetailsCard>
      ) : (
        <ErrorMessage data="previous Assets" />
      )}
    </ScrollView>
  );
};

export default Asset;
