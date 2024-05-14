import {ReactNode, useState} from 'react'
import { Modal, Alert, View, StyleSheet, Text } from 'react-native'

type PopupProps = {
  isVisible: boolean;
  children: ReactNode;
  title: string;
}

const Popup = ({
  isVisible,
  children, 
  title} : PopupProps) => {

  return (
    <View style={styles.centeredView}>
      <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width:0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    elevation: 100,
    height: '40%',
    justifyContent: 'center'
  },
  modalText: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16
  },
})

export default Popup