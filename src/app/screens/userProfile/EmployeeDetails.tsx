import React from 'react';
import {ScrollView, View} from 'react-native';

import DetailsView from '../../components/profile/cardDetails/detailsView';
import CardDetails from '../../components/profile/cardDetails';
import CustomAccordian from '../../components/customAccordian';
import Typography from '../../components/typography';
import ErrorMessage from '../../components/errorMessage';

import labelFormatter from '../../utils/userProfile/labelFormatter';

import {
  assessmentDetailsType,
  designationDetailsType,
  employeeDetailsType,
  otherDetailsType,
  projectType,
} from '../../types';
import colors from '../../constant/colors';
import {NO_DETAILS_FOUND} from '../../constant/message';

type dataType = {
  employeeDetail: employeeDetailsType;
  designationDetails: designationDetailsType;
  assessmentDetails: assessmentDetailsType;
  otherDetails: otherDetailsType;
  currentProjects: projectType[];
  previousProjects: projectType[];
};

type Props = {
  data: dataType;
};
const EmployeeDetails = ({data}: Props) => {
  const dataArray = Object.entries(data);
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      {dataArray.map(([key, content], index: number) => {
        return key === 'currentProjects' || key === 'previousProjects' ? (
          <CardDetails title={labelFormatter(key)} key={index}>
            <CustomAccordian data={content as projectType[]} />
          </CardDetails>
        ) : (
          <View key={index}>
            <CardDetails title={labelFormatter(key)}>
              <DetailsView data={content} />
            </CardDetails>
            {key === 'otherDetails' && (
              <CardDetails title={'Description'} key="describe">
                <View>
                  {(content as otherDetailsType)?.description ? (
                    <Typography type="header">
                      {(content as otherDetailsType).description}
                    </Typography>
                  ) : (
                    <ErrorMessage message={NO_DETAILS_FOUND} />
                  )}
                </View>
              </CardDetails>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default EmployeeDetails;
