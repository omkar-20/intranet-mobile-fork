import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import CustomChip from '../../components/customChip';
import ErrorMessage from '../../components/errorMessage';

import {skillsType} from '../../types';
import {NO_OTHER_SKILLS} from '../../constant/message';
import UpdateSkills from './components/updateSkills';
import Button from '../../components/button';

type Props = {
  data: skillsType;
  refresh: () => void;
};
const skillsFormatter = (skills: string): string[] =>
  skills ? skills.split(',') : [];

const Skills = ({data, refresh}: Props) => {
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const toggleModal = () =>
    setShouldShowModal(shouldShowModal => !shouldShowModal);
  return (
    <>
      <ScrollView>
        <CardDetails title="Details">
          <DetailsView
            data={{
              primarySkill: data.primarySkill,
              secondarySkill: data.secondarySkill,
              ternarySkill: data.ternarySkill,
            }}
          />
        </CardDetails>
        <CardDetails title="Other Skills">
          <View style={styles.containerStyle}>
            {skillsFormatter(data.otherSkills as string).map(
              (skill: string, index: number) =>
                skill ? (
                  <CustomChip
                    key={index}
                    label={skill}
                    style={styles.chipStyle}
                    mode="view"
                  />
                ) : (
                  <ErrorMessage key={index} message={NO_OTHER_SKILLS} />
                ),
            )}
          </View>
        </CardDetails>
      </ScrollView>
      <View style={styles.updateContainer}>
        <View style={styles.update}>
          <Button
            title="Update skills"
            onPress={toggleModal}
            type="secondary"
          />
        </View>
        <UpdateSkills
          data={data}
          toggleModal={toggleModal}
          isVisible={shouldShowModal}
          refresh={refresh}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipStyle: {
    marginLeft: 10,
  },
  update: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  updateTextStyle: {
    color: '#3069F6',
  },
  updateContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
export default Skills;
