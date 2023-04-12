import React from 'react';
import {useWindowDimensions, StyleSheet} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import {useQuery} from 'react-query';

import Deployment from '../Deployment';
import EmployeeDetails from '../EmployeeDetails';
import PersonalDetails from '../PersonalDetails';
import PublicProfile from '../PublicProfile';
import Skills from '../Skills';
import Asset from '../Assets';

import {getUserRequest} from '../../../services/api/userProfile';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

import {
  AssetType,
  addressType,
  assessmentDetailsType,
  deploymentDetailsType,
  designationDetailsType,
  emergencyContactDetailsType,
  employeeDetailsType,
  otherDetailsType,
  personalDetailsType,
  profileDetailsType,
  projectType,
  skillsType,
  socialDetailsType,
} from '../../../types';
import ErrorMessage from '../../../components/ErrorMessage';
import {View} from 'react-native-animatable';

type dataType = {
  publicProfile: {
    publicProfile: profileDetailsType;
    socialDetails: socialDetailsType;
  };
  privateProfile: {
    personalDetail: personalDetailsType;
    emergencyContactDetails: emergencyContactDetailsType[];
    address: addressType[];
  };
  employeeDetail: {
    employeeDetail: employeeDetailsType;
    designationDetails: designationDetailsType;
    assessmentDetails: assessmentDetailsType;
    otherDetails: otherDetailsType;
    currentProjects: projectType[];
    previousProjects: projectType[];
  };
  skills: skillsType;
  assets: {
    currentAsset: AssetType[];
    previousAsset: AssetType[];
  };
  deployment: deploymentDetailsType;
};

const renderSceneWrapper = (data: dataType, refetch: () => {}) =>
  SceneMap({
    publicProfile: () => <PublicProfile data={data.publicProfile} />,
    personalDetails: () => <PersonalDetails data={data.privateProfile} />,
    skills: () => <Skills data={data.skills} refresh={refetch} />,
    employeeDetails: () => <EmployeeDetails data={data.employeeDetail} />,
    assets: () => <Asset data={data.assets} />,
    deployment: () => <Deployment data={data.deployment} />,
  });

const CustomTabView = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'publicProfile', title: 'Public Profile'},
    {key: 'personalDetails', title: 'Personal Details'},
    {key: 'skills', title: 'Skills'},
    {key: 'employeeDetails', title: 'Employee Details'},
    {key: 'assets', title: 'Asset'},
    {key: 'deployment', title: 'Deployment'},
  ]);

  const {data, refetch, isError, isRefetchError} = useQuery({
    queryKey: ['user'],
    queryFn: getUserRequest,
  });

  if (!isError && data && !isRefetchError) {
    console.log(data);
    const renderScene = renderSceneWrapper(data, refetch);
    const renderTabBar = (
      props: SceneRendererProps & {
        navigationState: NavigationState<{key: string; title: string}>;
      },
    ) => {
      return (
        <TabBar
          {...props}
          indicatorStyle={styles.indicatorStyle}
          inactiveColor={colors.SECONDARY}
          activeColor={colors.PRIMARY}
          scrollEnabled={true}
          labelStyle={styles.labelStyle}
          style={styles.tabBarContainer}
        />
      );
    };

    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={styles.tabViewContainer}
        sceneContainerStyle={styles.sceneContainerStyle}
      />
    );
  } else {
    return (
      <View style={styles.errorMessageContainer}>
        <ErrorMessage data="Profile" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },
  tabBarContainer: {
    backgroundColor: colors.WHITE,
    marginBottom: 28,
    height: 40,
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  sceneContainerStyle: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tabViewContainer: {backgroundColor: colors.WHITE},
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomTabView;
