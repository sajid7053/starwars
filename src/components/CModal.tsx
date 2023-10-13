import React, { } from "react";
import { SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
export const { height } = Dimensions.get('window');
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

interface CModalProps {
    children?: React.ReactNode,
    isVisible: boolean,
    showCloseButton: boolean,
    onClose: () => void,
    style?: object,
}

const CModal = (props: CModalProps) => {
    return (
        <Modal
            {...props}
            isVisible={props.isVisible}
            style={[styles.modal, props.style]}>
            <SafeAreaView style={{ maxHeight: height / 1.2 }} >
                {props.showCloseButton &&
                    <TouchableOpacity style={styles.closeButton} onPress={() => props.onClose()}>
                        <Image
                            source={require('../assets/images/close_1.png')}
                            style={{ height: 35, width: 35 }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                }
                {props.children}
            </SafeAreaView>
        </Modal>
    );
};

export default CModal;

const styles = StyleSheet.create({
    modal: { flex: 1, marginBottom: 20 },
    closeButton: {
        alignSelf: 'flex-end',
        margin: 10,

    }
})
