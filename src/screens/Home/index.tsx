import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { Avatar, Badge } from 'react-native-elements'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import People from "./People";
import Planets from "./Planets";
import Films from "./Films";
import Starships from "./Starships";
const initialLayout = { width: Dimensions.get('window').width };

const Home = () => {

    //states
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'people', title: 'People' },
        { key: 'planets', title: 'Planets' },
        { key: 'films', title: 'Films' },
        { key: 'starships', title: 'Starships' },
    ]);

    const peopleComponent = () => {
        return (
            <People />
        )
    }

    const planetComponent = () => {
        return (
            <Planets />
        )
    }

    const filmComponent = () => {
        return (
            <Films />
        )
    }

    const starshipComponent = () => {
        return (
            <Starships />
        )
    }


    const renderScene = SceneMap({
        'people': peopleComponent,
        'planets': planetComponent,
        'films': filmComponent,
        'starships': starshipComponent
    });

    const renderTabBar = (props: any) => (
        <View>
            <View style={styles.tabbar_container}>
                <TabBar
                    {...props}
                    scrollEnabled={false}
                    indicatorStyle={styles.indicator}
                    style={styles.tabbar}
                    activeColor={'white'}
                    inactiveColor={'black'}
                    renderLabel={({ route, focused, color }) => {

                        return (
                            <Text
                                style={{
                                    width: 140,
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>
                                {route.title}
                            </Text>
                        );
                    }}
                />
            </View>
            <View style={styles.line} />
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{}}>
                    <Image
                        source={require('../../assets/images/starlogo.jpg')}
                        style={styles.logoStyle}
                        resizeMode="contain" />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                        }}
                        size="small"
                    />

                    <Badge
                        status="success"
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                    />
                </View>
            </View>
            <View style={{ marginHorizontal: 12 }}>
                <TextInput style={styles.searchBar} placeholder="Search" />
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
                swipeEnabled={false}
                lazy />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    logoStyle: {
        height: 70,
        width: 70
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    searchBar: {
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 12
    },
    tabbar_container: {
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 8
    },
    indicator: {
        backgroundColor: 'white',
        height: 6,
    },
    tabbar: {
        backgroundColor: 'black',
        elevation: 0,
        marginTop: -8,
        padding: 0,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
})
