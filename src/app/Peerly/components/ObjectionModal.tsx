import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../components/button/index';

interface CenteredModalProps {
  visible: boolean;
  onClose?: () => void;
  setReason: (value: string) => void;
  onConfirm: () => void;
  reason: string;
  isDisabled: boolean;
}

const ObjectionModal: React.FC<CenteredModalProps> = ({
  visible,
  onClose,
  setReason,
  onConfirm,
  reason,
  isDisabled,
}) => {
  const handleReason = (value: string) => {
    setReason(value);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Please give the reason behind this objection?
            </Text>
            <Text style={styles.modalText}> HR team will contact shortly.</Text>
            <TextInput
              style={styles.description}
              placeholder="Enter you text here"
              onChangeText={handleReason}
              value={reason}
              multiline
            />
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Confirm"
                  type="primary"
                  onPress={onConfirm}
                  disabled={isDisabled}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: '50%',
    borderRadius: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  modalText: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  description: {
    textAlignVertical: 'top',
    borderRadius: 4,
    borderWidth: 1,
    height: 200,
    width: 250,
    borderColor: 'black',
    marginBottom: 16,
    backgroundColor: 'white',
  },
});

export default ObjectionModal;
