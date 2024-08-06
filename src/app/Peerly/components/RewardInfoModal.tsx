import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Button from './button/button';

interface RewardInfoModalProps {
  visible: boolean;
  closeModal: () => void;
}
const RewardInfoModal: React.FC<RewardInfoModalProps> = ({
  visible,
  closeModal,
}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            posuere faucibus est non blandit. Maecenas in dolor vulputate ante
            commodo ultricies.
          </Text>
          <Button title="Close" type="secondary" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    marginBottom: 15,
  },
});

export default RewardInfoModal;
