import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import axios from 'react-native-axios';
import EmptyList from "../../components/EmptyList";
import moment = require("moment");
import CModal from "../../components/CModal";
const { height } = Dimensions.get('window');

interface FilmProps {
    list: any
}

type FilmDetails = {
    release_date?: string,
    title?: string,
    opening_crawl?: string,
    director?: string
}

const Films = (props: FilmProps) => {
    const {list} = props
    const [filmList, setFilmList] = useState<FilmDetails[]>([])
    const [itemObject, setItemObject] = useState<FilmDetails>({})
    const [modal, setModal] = useState(false)


    useEffect(() => {
        setFilmList(list)
    }, [])


    //date convert format
    const convertDateFormat = (date: any) => {
        let convertedDate = ""
        if (date) {
            let month = moment(date).format('MMM')
            let year = moment(date).format('YYYY')
            let day = moment(date).format('DD')
            convertedDate = day + " " + month + " " + year
        }
        return convertedDate

    }

    const commonUI = (item: FilmDetails, fromPopup: Boolean) => {
        return (
            <>
                <ImageBackground
                    source={require('../../assets/images/poster_4.jpg')}
                    resizeMode="cover"
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                        <View style={styles.releaseDateContainer}>
                            <Text style={{ color: 'white' }}>{convertDateFormat(item.release_date)}</Text>
                        </View>
                        {!fromPopup ? <View style={styles.threeDotsContainer}>
                            <View style={styles.threeDots}></View>
                            <View style={styles.threeDots}></View>
                            <View style={styles.threeDots}></View>
                        </View> : null}
                    </View>
                </ImageBackground>
                <View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={{ marginTop: 10 }} numberOfLines={2}>{item.opening_crawl}</Text>
                    <Text style={{ marginTop: 5 }}>{item.director}</Text>
                </View>
            </>
        )
    }

    const openPopUp = (item: FilmDetails) => {
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

    const renderList = ({ item, index }: { item: FilmDetails, index: number }) => {
        return (
            <TouchableOpacity style={styles.cardView} onPress={() => openPopUp(item)}>
                {commonUI(item, false)}
            </TouchableOpacity>
        )
    }

    const renderUI = () => {
        return (
            <FlatList
                data={filmList}
                showsVerticalScrollIndicator={false}
                renderItem={renderList}
                key={moment().valueOf().toString()} />
        )
    }


    return (
        <View style={styles.container}>
            {renderUI()}
            {modal && showModal()}
        </View>
    );
};

export default Films;

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
