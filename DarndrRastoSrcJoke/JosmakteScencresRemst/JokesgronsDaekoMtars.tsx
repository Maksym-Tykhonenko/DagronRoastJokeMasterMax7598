const savedIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/saved.png'); // збережено
import jokes from '../AkeoRokesttAisiesetsMetrs/jokes';
const saveIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/unsaved.png'); // не збережено
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
const shareIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/share.png');
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity, Image, Share,
    Text,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function JokesgronsDaekoMtars() {
    const [selectedJoke, setSelectedJoke] = useState<any>(null);
    const [savedJokes, setSavedJokes] = useState<string[]>([]);

    useEffect(() => {
        AsyncStorage.getItem('savedJokes').then(data => {
            if (data) setSavedJokes(JSON.parse(data));
        });
    }, []);

    const handleCategoryPress = (category: any) => {
        if (!category.jokes || category.jokes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * category.jokes.length);
        setSelectedJoke({
            ...category.jokes[randomIndex],
            categoryTitle: category.title,
        });
    };

    const isJokeSaved = (joke: any) => {
        return savedJokes.includes(joke.id);
    };

    const handleSavePress = async () => {
        if (!selectedJoke) return;
        let updated;
        if (isJokeSaved(selectedJoke)) {
            updated = savedJokes.filter(id => id !== selectedJoke.id);
        } else {
            updated = [...savedJokes, selectedJoke.id];
        }
        setSavedJokes(updated);
        await AsyncStorage.setItem('savedJokes', JSON.stringify(updated));
    };

    const handleSharePress = () => {
        Share.share({
            message: `${selectedJoke.text}\n\n- ${selectedJoke.categoryTitle}`,
        })
    };

    return (
        <View style={{ flex: 1 }}>
            {!selectedJoke && (
                <View>
                    {jokes.map((jokeCategory, index) => (
                        <TouchableOpacity
                            onPress={() => handleCategoryPress(jokeCategory)} key={index} style={{ marginTop: height * 0.016 }}
                        >
                            <Image
                                source={jokeCategory.image}
                                style={{
                                    width: width * 0.91,
                                    resizeMode: 'stretch',
                                    height: height * 0.21,
                                    alignSelf: 'center',
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {selectedJoke && (
                <View style={styles.jokeContainer}>
                    <Text style={styles.headerText}>{selectedJoke.categoryTitle?.toUpperCase()}</Text>
                    <View style={styles.jokeBox}>
                        <Image
                            source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/fire.png')}
                            style={{
                                resizeMode: 'contain',
                                width: width * 0.14,
                                right: width * 0.03,




                                position: 'absolute',
                                top: height * 0.012,
                                height: width * 0.14,
                            }}
                        />
                        <Text style={styles.quoteMark}>"</Text>
                        <Text style={styles.jokeText}>{selectedJoke.text}</Text>
                        <Text style={[styles.quoteMark, { alignSelf: 'flex-end' }]}> "</Text>
                        <View style={styles.actionsRow}>
                            <TouchableOpacity onPress={handleSavePress} style={styles.actionButton}>
                                <Image
                                    source={isJokeSaved(selectedJoke) ? savedIcon : saveIcon}
                                    style={styles.actionIcon}
                                />
                                <Text style={[styles.actionText, {
                                    color: isJokeSaved(selectedJoke) ? '#F0B100' : '#90A1B9',
                                }]}>
                                    {isJokeSaved(selectedJoke) ? 'Saved' : 'Save'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSharePress} style={styles.actionButton}>
                                <Image source={shareIcon} style={styles.actionIcon} />
                                <Text style={[styles.actionText, {
                                    color: '#51A2FF'
                                }]}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.anotherRoastBtn}
                        onPress={() => setSelectedJoke(null)}
                    >
                        <Text style={styles.anotherRoastText}>Another Roast</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    jokeContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        letterSpacing: width * 0.0025,
        fontWeight: 'bold',
        color: '#FFD600',
        marginBottom: height * 0.025, // ~20 при height 800
        fontSize: width * 0.05, // ~20 при width 400
    },
    jokeBox: {
        width: width * 0.91,
        backgroundColor: 'rgba(15, 23, 43, 0.8)',
        justifyContent: 'center',
        padding: width * 0.06, // ~24 при width 400
        minHeight: height * 0.28,
        alignItems: 'center',
        borderColor: 'rgba(208, 135, 0, 0.35)',
        borderWidth: width * 0.0025, // ~1 при width 400
        borderRadius: width * 0.045, // ~18 при width 400
    },
    quoteMark: {
        color: '#F0B100',
        fontSize: width * 0.07, // ~28 при width 400
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    jokeText: {
        marginVertical: height * 0.022, // ~18 при height 800
        marginTop: height * 0.04, // ~8 при height 800
        fontSize: width * 0.046, // ~20 при width 400
        textAlign: 'center',
        fontWeight: '600',
        color: '#fff',
    },
    actionsRow: {
        gap: width * 0.08, // ~32 при width 400
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: height * 0.022, // ~18 при height 800
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIcon: {
        width: width * 0.16, // ~44 при width 400
        height: width * 0.16,
        marginBottom: height * 0.005, // ~4 при height 800
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: width * 0.035, // ~14 при width 400
    },
    anotherRoastBtn: {
        paddingVertical: height * 0.02, // ~16 при height 800
        backgroundColor: '#F0B100',
        justifyContent: 'center',
        borderRadius: width * 0.03, // ~12 при width 400
        width: width * 0.91,
        alignItems: 'center',
        marginTop: height * 0.04, // ~32 при height 800
    },
    anotherRoastText: {
        color: '#000', fontWeight: 'bold', fontSize: width * 0.045, // ~18 при width 400
    },
});
