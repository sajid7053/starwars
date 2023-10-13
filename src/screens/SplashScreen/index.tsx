import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const SplashScreen = () => {
    const navigation = useNavigation()
    useEffect(()=> {
        setTimeout(()=> {
            navigation.navigate('Home')
        },2500)
    },[])
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/starlogo.jpg')}
                style={styles.logoStyle}
                resizeMode="contain" />

            <View style={styles.bannerIMageContaner}>
                <Image
                    source={require('../../assets/images/starvillain.jpg')}
                    style={styles.bannerImage}
                    resizeMode="contain" />

                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Welcome to Star Wars Dashboard</Text>
                    <Text style={styles.descriptionText}>Star Wars is an American epic space opera media franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon.</Text>
                </View>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoStyle: {
        height: 160,
        width: 160
    },
    bannerIMageContaner: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        height: 300,
        width: 300,

    },
    textContainer: {
        marginTop: 15
    },
    welcomeText: {
        color: '#fff',
        fontFamily: 'Cochin',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        
    },
    descriptionText: {
        color: 'grey',
        alignSelf:'center',
        marginHorizontal: 40
    }
})
