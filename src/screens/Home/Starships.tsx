import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ImageBackground, Image, Dimensions } from "react-native";
import axios from 'react-native-axios';
import EmptyList from "../../components/EmptyList";
import moment = require("moment");
import { TouchableOpacity } from "react-native-gesture-handler";
import CModal from "../../components/CModal";
const { height } = Dimensions.get('window');

type StarshipDetails = {
    name?: string,
    model?: string,
    starship_class?: string,
    hyperdrive_rating?: string,
    manufacturer?: string
}

const Starships = () => {
    const [loader, setLoader] = useState(false)
    const [starShipList, setStarShipList] = useState<StarshipDetails[]>([])
    const [openModal, setModal] = useState(false)
    const [item, setItem] = useState<StarshipDetails>({})


    useEffect(() => {
        getStarshipList()
    }, [])

    const getStarshipList = () => {
        setLoader(true)
        axios.get('https://swapi.dev/api/starships')
            .then(function (response: any) {
                let data = response?.data
                let results = data?.results
                setStarShipList(results)
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

    const openPopUp = (item: StarshipDetails) => {
        setModal(true)
        setItem(item)
    }

    const commonUI = (item: StarshipDetails) => {
        return (
            <>
                <ImageBackground
                    source={require('../../assets/images/starship.jpg')}
                    resizeMode="cover"
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 10 }}>
                </ImageBackground>
                <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ flex: 1, marginVertical: 15 }}>
                            <Text style={styles.titleText}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10, flex: 1 }}>
                                <Text style={{ flex: 1 }}>{item.model}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={[styles.threeDots,{backgroundColor: 'grey'}]}></View>
                                    <Text style={{marginLeft: 5}}>{item.starship_class}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/images/rocket.png')}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain" />
                        </View>
                    </View>

                    <Text style={{ color: '#9A9E9C', marginTop: 10 }}>The starship starred in Return of the jedi and was piloted by Richard Marquand</Text>
                    <View style={{ alignSelf: 'flex-end', marginTop: 10, }}>
                        <Text>{item.manufacturer}</Text>
                        <Text>{item.hyperdrive_rating}</Text>
                    </View>
                </View>
            </>
        )
    }


    const renderList = ({ item, index }: { item: StarshipDetails, index: number }) => {
        return (
            <TouchableOpacity style={styles.cardView} onPress={() => openPopUp(item)}>
                {commonUI(item)}
            </TouchableOpacity>
        )
    }

    const renderUI = () => {
        return (
            <FlatList
                data={starShipList}
                showsVerticalScrollIndicator={false}
                renderItem={renderList}
                ListEmptyComponent={() => <EmptyList msg={"No result"} />}
                key={moment().valueOf().toString()} />
        )
    }

    const closeModelPopup = () => {
        setModal(false)
    }

    const showModal = () => {
        return (
            <CModal
                showCloseButton={true}
                isVisible={openModal}
                onClose={() => closeModelPopup()}
                style={styles.linkModalContent}>
                <View style={styles.flatStyle}>
                    {commonUI(item)}
                </View>
            </CModal>
        )
    }


    return (
        <View style={styles.container}>
            {loader ? loaderView() : renderUI()}
            {openModal && showModal()}
        </View>
    );
};

export default Starships;

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
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
