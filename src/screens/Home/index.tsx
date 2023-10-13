import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ActivityIndicator } from "react-native";
import { Avatar, Badge } from 'react-native-elements'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import People from "./People";
import Planets from "./Planets";
import Films from "./Films";
import Starships from "./Starships";
const initialLayout = { width: Dimensions.get('window').width };
import axios from 'react-native-axios';

const Home = () => {

    //states
    const [loader, setLoader] = useState(false)
    const [list, setList] = useState([])
    const [listAlias, setListAlias] = useState([])
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'people', title: 'People' },
        { key: 'planets', title: 'Planets' },
        { key: 'films', title: 'Films' },
        { key: 'starships', title: 'Starships' },
    ]);
    const [text, setText] = useState('')

    useEffect(() => {
        getList()

        //reset search text value when user switch to other tab
        setText("")
    }, [index])


    // To call an api based on index
    const peopleURL = 'https://swapi.dev/api/people'
    const planetURL = 'https://swapi.dev/api/planets'
    const filmURL = 'https://swapi.dev/api/films'
    const starshipURL = 'https://swapi.dev/api/starships'

    const fetchUrl = () => {
        switch (index) {
            case 0:
                return peopleURL
            case 1:
                return planetURL
            case 2:
                return filmURL
            case 3:
                return starshipURL
        }
    }

    const getList = () => {
        setLoader(true)
        axios.get(fetchUrl())
            .then(function (response: any) {
                let data = response?.data
                let results = data?.results
                setList(results)
                setListAlias(results)
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

    const peopleComponent = () => {
        return (
            <>
                {loader ? loaderView() : <People list={list} />}
            </>
        )
    }

    const planetComponent = () => {
        return (
            <>
                {loader ? loaderView() : <Planets list={list} />}
            </>
        )
    }

    const filmComponent = () => {
        return (
            <>
                {loader ? loaderView() : <Films list={list} />}
            </>
        )
    }

    const starshipComponent = () => {
        return (
            <>
                {loader ? loaderView() : <Starships list={list} />}
            </>
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

    //search item by name
    const searchItem = (searchVal: string) => {
        const fltrlst = listAlias?.filter(item => {
            const itemName = item.name?.toUpperCase()
            const searchValRef = searchVal.toString().toUpperCase();
            return itemName.indexOf(searchValRef) > -1;
        });
        if (fltrlst != undefined) {
            setList(fltrlst)
            setText(searchVal)
        } 
    }


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
                <TextInput style={styles.searchBar} value={text} placeholder="Search" onChangeText={(e)=>searchItem(e)} />
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
    loaderStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
})
