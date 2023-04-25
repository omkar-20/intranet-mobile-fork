import React, {memo, useCallback} from 'react';
import {
  SectionList,
  SectionListProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Typography from '../../../components/typography';
import TimesheetItem from './timesheetItem';
import Linear from '../../../components/seperator/linear';
import EmptyList from './emptyList';

import {Timesheet} from '../interface';

type Props = SectionListProps<any, any> & {
  style?: ViewStyle;
  timesheetListData: Array<{
    title: string;
    data: Timesheet[];
  }>;
  onEdit: Function;
  onDelete: Function;
  emptyListMessage?: string;
  isDeleteVisible?: boolean;
};

const seperator = () => <Linear style={styles.seperator} />;

const footer = () => <View style={styles.footer} />;

const sectionHeader = ({section}: {section: {title: string}}) => (
  <Typography style={styles.title}>{section.title}</Typography>
);

const SectionListTimesheet = ({
  timesheetListData,
  onEdit,
  onDelete,
  style,
  isDeleteVisible = true,
  emptyListMessage,
  ...props
}: Props) => {
  const renderItem = useCallback(
    ({item, section}: {item: Timesheet; section: {title: string}}) => (
      <TimesheetItem
        timesheetData={item}
        onEdit={onEdit}
        onDelete={onDelete}
        title={section.title}
        isDeleteVisible={isDeleteVisible}
      />
    ),
    [isDeleteVisible, onDelete, onEdit],
  );

  const listEmptyComponent = useCallback(
    () => <EmptyList message={emptyListMessage} />,
    [emptyListMessage],
  );

  return (
    <SectionList
      {...props}
      sections={timesheetListData}
      keyExtractor={(item, index) => item.timesheet_id + index}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      renderSectionFooter={seperator}
      extraData={timesheetListData}
      style={style}
      ListFooterComponent={footer}
      ItemSeparatorComponent={seperator}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
  },
  footer: {
    paddingBottom: 100,
  },
  seperator: {
    marginVertical: 10,
  },
});
export default memo(SectionListTimesheet);
