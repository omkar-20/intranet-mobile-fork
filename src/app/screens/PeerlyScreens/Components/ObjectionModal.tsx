import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import Button from '../../../components/button/index';

interface CenteredModalProps {
  visible: boolean;
  onClose?: () => void;
}

const ObjectionModal: React.FC<CenteredModalProps> = ({visible, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      style={styles.container}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text>Please give the reason behind this objection?</Text>
          <Text> HR team will contact shortly.</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button title="Confirm" type="secondary" onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
});

export default ObjectionModal;
