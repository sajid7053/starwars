import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import axios from 'react-native-axios';
import EmptyList from "../../components/EmptyList";
import moment = require("moment");
import CModal from "../../components/CModal";
const { height } = Dimensions.get('window');

type PLanetsDetails = {
    name?: string,
    population?: string,
    terrain?: string,
    orbital_period?: string
}

const Planets = () => {
    const [loader, setLoader] = useState(false)
    const [planetList, setPlanetList] = useState<PLanetsDetails[]>([])
    const [itemObject, setItemObject] = useState<PLanetsDetails>({})
    const [modal, setModal] = useState(false)


    useEffect(() => {
        getPlanetList()
    }, [])

    const getPlanetList = () => {
        setLoader(true)
        axios.get('https://swapi.dev/api/planets')
            .then(function (response: any) {
                let data = response?.data
                let results = data?.results
                setPlanetList(results)
                setLoader(false)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    const loaderView = () => {
        return (
            <ActivityIndicator
                size="large"
                color={'blue'}
                style={styles.loaderStyle}
            />
        );
    };

    const commonUI = (item: PLanetsDetails, fromPopup: Boolean) => {
        return (
            <>
                <ImageBackground
                    source={require('../../assets/images/planet.jpg')}
                    resizeMode="cover"
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 10 }}>
                    <View style={{ alignSelf: 'flex-end', marginHorizontal: 15 }}>
                        {!fromPopup ? <View style={styles.threeDotsContainer}>
                            <View style={styles.threeDots}></View>
                            <View style={styles.threeDots}></View>
                            <View style={styles.threeDots}></View>
                        </View> : null}
                    </View>
                </ImageBackground>
                <View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text>THe planet is inhabited by {item.population} creatures.</Text>
                    <Text>The terrain is {item.terrain}. With orbital period of {item.orbital_period} of around its local star.</Text>
                </View>
            </>
        )
    }

    const openPopUp = (item: PLanetsDetails) => {
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
                <View style={styles.flatStyle}>
                    {commonUI(itemObject, true)}
                </View>
            </CModal>
        )
    }


    const renderList = ({ item, index }: { item: PLanetsDetails, index: number }) => {
        return (
            <TouchableOpacity style={styles.cardView} onPress={() => openPopUp(item)}>
                {commonUI(item, false)}
            </TouchableOpacity>
        )
    }

    const renderUI = () => {
        return (
            <FlatList
                data={planetList}
                showsVerticalScrollIndicator={false}
                renderItem={renderList}
                ListEmptyComponent={() => <EmptyList msg={"No result"} />}
                key={moment().valueOf().toString()} />
        )
    }


    return (
        <View style={styles.container}>
            {loader ? loaderView() : renderUI()}
            {modal && showModal()}
        </View>
    );
};

export default Planets;

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
    imageBackground: {
        width: '100%',
        height: 200,
    },
    cardView: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    releaseDateContainer: {
        borderRadius: 8,
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        height: 40,
        width: 100,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    threeDotsContainer: {
        borderRadius: 7,
        backgroundColor: 'white',
        width: 45,
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    threeDots: {
        backgroundColor: 'black',
        borderRadius: 3,
        width: 5,
        height: 5,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
        marginTop: 5
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
