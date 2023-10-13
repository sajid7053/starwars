import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import axios from 'react-native-axios';
import EmptyList from "../../components/EmptyList";
import moment = require("moment");
import CModal from "../../components/CModal";
const { height } = Dimensions.get('window');

type charactersDescription = {
    name?: string,
    birth_year?: string,
}


const People = () => {
    const [characterList, setCharacterList] = useState<charactersDescription[]>([])
    const [loader, setLoader] = useState(false)
    const [itemObject, setItemObject] = useState<charactersDescription>({})
    const [modal, setModal] = useState(false)


    useEffect(() => {
        getCharacterList()
    }, [])

    const loaderView = () => {
        return (
            <ActivityIndicator
                size="large"
                color={'blue'}
                style={styles.loaderStyle}
            />
        );
    };

    const getCharacterList = () => {
        setLoader(true)
        axios.get('https://swapi.dev/api/people')
            .then(function (response: any) {
                let data = response?.data
                let results = data?.results
                setCharacterList(results)
                setLoader(false)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    const ModalUI = (item: charactersDescription) => {
        return (
            <>
                <Image
                    source={{ uri: "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0" }}
                    resizeMode="contain"
                    style={{ height: 160, width: 180, borderRadius: 10 }} />
                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>{item.name}</Text>
                    <Text>The character hails from</Text>
                    <Text>Yavin IV, born on</Text>
                    <Text>{item.birth_year}</Text>
                </View>
            </>
        )
    }

    const openPopUp = (item: charactersDescription) => {
        setModal(true)
        setItemObject(item)
    }

    const closeModelPopup = () => {
        setModal(false)
    }

    const showModal = () => {
        return (
            <CModal
                showCloseButton={true}
                isVisible={modal}
                onClose={() => closeModelPopup()}
                style={styles.linkModalContent}>
                <View style={[styles.flatStyle,{justifyContent: 'center', alignItems:'center'}]}>
                    {ModalUI(itemObject)}
                </View>
            </CModal>
        )
    }

    const renderList = ({ item, index }: { item: charactersDescription, index: number }) => {
        return (
            <>
                {index < 10 && <TouchableOpacity style={styles.popularCharacterList} onPress={() => openPopUp(item)}>
                    {ModalUI(item)}
                </TouchableOpacity>}
            </>
        )
    }

    const renderCommonUI = (isPopular: Boolean) => {
        return (
            <>
                <Text style={styles.popularCharacterText}>{isPopular ? "Popular Characters" : "All Characters"}</Text>
                <FlatList
                    data={characterList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderList}
                    ListEmptyComponent={() => <EmptyList msg={"No result"} />}
                    key={moment().valueOf().toString()} />
            </>
        )
    }

    const renderPopularCharacters = () => {
        return (
            <>
                {renderCommonUI(true)}
            </>
        )
    }

    const renderAllCharacters = () => {
        return (
            <View style={{ marginTop: 15 }}>
                {renderCommonUI(false)}
            </View>
        )
    }

    const renderCharacters = () => {
        return (
            <ScrollView
                style={styles.popularCharacterContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 15 }}>
                {renderPopularCharacters()}
                {renderAllCharacters()}
            </ScrollView>
        )
    }
    return (
        <View style={styles.container}>
            {loader ? loaderView() : renderCharacters()}
            {modal && showModal()}
        </View>
    );
};

export default People;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loaderStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    popularCharacterContainer: {
        marginTop: 15,
        marginHorizontal: 20,
    },
    popularCharacterText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cochin',
    },
    popularCharacterList: {
        marginRight: 15,
        marginTop: 15
    },
    linkModalContent: {
        margin: 0,
        marginTop: 20
    },
    flatStyle: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 25,
        padding: 10,
        maxHeight: height / 1.5
    },
})
