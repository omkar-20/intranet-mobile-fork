import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  useGetCoworkerList,
  useGetCoreValuesList,
  usePostAppreciation,
} from './appreciation.hooks';
import {useEffect} from 'react';
import Typography from '../../../components/typography';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import PickerSelect from '../../../components/pickers/pickerSelect';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import Select from '../Components/Select';
import {WebView} from 'react-native-webview';
interface FormInput {
  receiver: number;
  core_value_id: number;
  description: string;
}

const AppreciationScreen = () => {
  // const {data: coreValuesList, isSuccess} = useGetCoworkerList();
  const {data: coreValuesList} = useGetCoreValuesList();
  // const {mutate} = usePostAppreciation();
  console.log('Welcome to Appri', coreValuesList?.data);
  // useEffect(() => {
  //   mutate({
  //     receiver: 'amar',
  //     core_value_id: '1',
  //     description: 'Don',
  //   });
  // }, [mutate]);
  console.log('coreValuesList', coreValuesList);

  const {handleSubmit, control} = useForm({
    defaultValues: {
      receiver: 0,
      core_value_id: 0,
      description: '',
    },
  });

  // const onSubmit: SubmitHandler<FormInput> = data => {
  //   console.log('Data', data);
  // };

  // const placeholder = {
  //   label: 'Select a sport...',
  //   value: null,
  //   color: '#9EA0A4',
  // };

  return (
    // <WebView
    //   source={{uri: 'http://peerly.s3-website.eu-north-1.amazonaws.com/'}}
    //   style={{flex: 1}}
    // />
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Appreciation</Text>
      <View style={styles.fieldWrapper}>
        <Typography type="header" style={styles.labelText}>
          Co-worker Name
        </Typography>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Select
              placeholder="Select Co-worker"
              onValueChange={onChange}
              value={value}
              items={[
                {value: 3, label: 'CoWorker1'},
                {value: 4, label: 'CoWorker1'},
              ]}
              // error={errors?.co_worker_name?.message}
            />
          )}
          name="receiver"
        />
      </View>
      <View style={styles.fieldWrapper}>
        <Typography type="header" style={styles.labelText}>
          Core Value
        </Typography>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Select
              placeholder="Select Core Value"
              onValueChange={onChange}
              value={value}
              items={[
                {value: 1, label: 'core1'},
                {value: 2, label: 'core2'},
              ]}
              // error={errors?.co_worker_name?.message}
            />
          )}
          name="core_value_id"
        />
      </View>
      <View style={styles.fieldWrapper}>
        <Typography type="header" style={styles.labelText}>
          Description
        </Typography>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.description}
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name="description"
        />
      </View>
      <Button title="Submit" onPress={() => {}} />
      {/* handleSubmit(onSubmit) */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldWrapper: {
    paddingBottom: 40,
  },
  labelText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    textAlignVertical: 'top',
    borderRadius: 4,
    borderWidth: 1,
    height: 400,
    borderColor: 'black',
  },
  button: {
    height: 20,
    fontSize: 16,
    borderRadius: 12,
  },
});

export default AppreciationScreen;
