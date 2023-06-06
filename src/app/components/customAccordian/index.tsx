import React, {useCallback, useState, memo} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

import DetailsView from '../profile/cardDetails/detailsView';
import Typography from '../typography';
import ErrorMessage from '../errorMessage';

import {projectType} from '../../types';
import colors from '../../constant/colors';
import {ArrowDown, ArrowUp} from '../../constant/icons';
import {NO_DETAILS_FOUND} from '../../constant/message';

type Props = {
  data: projectType[];
  headerContainerStyle?: ViewStyle;
};

type contentType = projectType;

const CustomAccordian = ({data, headerContainerStyle}: Props) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const setSections = useCallback((sections: number[]) => {
    setActiveSections(sections ? sections : []);
  }, []);

  const renderHeader = (
    content: contentType,
    index: number,
    isActive: boolean,
  ) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, headerContainerStyle]}>
        <Typography style={styles.headerText} type="label">
          {content.projectName}
        </Typography>
        {isActive ? <ArrowUp /> : <ArrowDown />}
      </Animatable.View>
    );
  };

  const renderContent = (content: contentType) => {
    // Accordion Content view
    return (
      <Animatable.View duration={400}>
        <DetailsView data={content} />
      </Animatable.View>
    );
  };

  return (
    <>
      {!data || data.length === 0 ? (
        <ErrorMessage message={NO_DETAILS_FOUND} />
      ) : (
        <Accordion
          activeSections={activeSections}
          sections={data}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setSections}
          underlayColor="#E6EDFF"
          touchableComponent={TouchableOpacity}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 30,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#E6EDFF',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: colors.LABEL_COLOR_SECONDARY,
    paddingLeft: 5,
  },
});
export default memo(CustomAccordian);
