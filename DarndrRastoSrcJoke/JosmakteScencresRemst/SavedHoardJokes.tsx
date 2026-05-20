import AsyncStorage from '@react-native-async-storage/async-storage';
import jokes from '../AkeoRokesttAisiesetsMetrs/jokes';
const { width, height } = Dimensions.get('window');
import React, { useState, useEffect } from 'react';
import {
    Share, ScrollView,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from 'react-native';

// Іконки
const deleteIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/delete.png');
const shareIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/sharing.png');

// Категорії з кольорами
const categoryColors: Record<string, string> = {
    "Smart Dragon": "#3B82F6",
    "Lazy Dragon": "#22C55E",
    "Perfectionist Dragon": "#F43F5E",
};

export default function SavedHoardJokes({ setScene }: any) {
    const [savedJokes, setSavedJokes] = useState<number[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('savedJokes').then(data => {
            if (data) setSavedJokes(JSON.parse(data));
            else setSavedJokes([]);
        });
    }, [refresh]);

    // Зібрати всі жарти по id
    const jokesByCategory = jokes.map(category => {
        const filteredJokes = category.jokes.filter((j: any) => savedJokes.includes(j.id));
        return filteredJokes.length > 0
            ? { ...category, jokes: filteredJokes }
            : null;
    }).filter(Boolean);

    const handleDelete = async (id: number) => {
        const updated = savedJokes.filter(jokeId => jokeId !== id);
        setSavedJokes(updated);
        await AsyncStorage.setItem('savedJokes', JSON.stringify(updated));
        setRefresh(r => !r); // для оновлення списку
    };

    const handleShare = (joke: any, category: string) => {
        Share.share({
            message: `${joke.text}\n\n- ${category}`,
        });
    };

    const handleGoToJokes = () => {
            setScene('Jokes');
        // або використайте ваш спосіб переходу
    };

    if (savedJokes.length === 0) {
        // Порожній екран
        return (
            <View style={styles.emptyContainer}>
                <Image
                    source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/dgnBook.png')}
                    style={styles.emptyDragon}
                />
                <Text style={styles.emptyTitle}>Your hoard is empty.</Text>
                <Text style={styles.emptySubtitle}>Save some jokes to fill it up.</Text>
                <TouchableOpacity style={styles.emptyButton} onPress={handleGoToJokes}>
                    <Text style={styles.emptyButtonText}>Go to jokes</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, }}>
            <View style={{ padding: width * 0.05 }}>
                {jokesByCategory.map((category: any, idx: number) => (
                    <View key={category.category} style={{ marginBottom: height * 0.04 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.01 }}>
                            <View style={{
                                width: width * 0.03,
                                height: width * 0.03,
                                borderRadius: width * 0.015,
                                backgroundColor: categoryColors[category.category] || '#fff',
                                marginRight: width * 0.02,
                            }} />
                            <Text style={styles.categoryTitle}>{category.category}</Text>
                        </View>
                        <View style={styles.categoryDivider} />
                        {category.jokes.map((joke: any) => (
                            <View key={joke.id} style={styles.jokeCard}>
                                <Text style={styles.jokeCardText}>"{joke.text}"</Text>
                                <View style={styles.jokeCardActions}>
                                    <TouchableOpacity onPress={() => handleDelete(joke.id)}>
                                        <Image source={deleteIcon} style={styles.actionIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleShare(joke, category.category)}>
                                        <Image source={shareIcon} style={styles.actionIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        
        
        
        alignItems: 'center',
        
        flex: 1,
        
        justifyContent: 'center',
    },
    emptyDragon: {
        height: width * 0.7,
        resizeMode: 'contain',
        marginBottom: height * 0.04,
        width: width * 0.7,
    },
    emptyTitle: {
        fontWeight: '500',
        color: '#90A1B9',
        marginBottom: height * 0.01,
        fontSize: width * 0.059,
    },
    emptySubtitle: {
        color: '#90A1B9',
        fontSize: width * 0.04,
        marginBottom: height * 0.04,
    },
    emptyButton: {
        borderRadius: width * 0.03,
        alignItems: 'center',
        paddingVertical: height * 0.018,
        marginTop: height * 0.01,
        width: width * 0.91,
        justifyContent: 'center',
        backgroundColor: '#F0B100',
    },



    emptyButtonText: { fontWeight: 'bold', color: '#000', fontSize: width * 0.045,},
    categoryTitle: {
        fontSize: width * 0.05,
        color: '#fff',
        fontWeight: 'bold',
    },
    categoryDivider: {
        height: 1,
        backgroundColor: '#334155',
        marginBottom: height * 0.015,
        marginLeft: width * 0.05,
    },
    jokeCard: { marginBottom: height * 0.018, borderRadius: width * 0.04, padding: width * 0.04, flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E293B',
    },




    jokeCardText: {
        color: '#fff',
        flex: 1,
        fontWeight: '500',
        fontSize: width * 0.04,
    },
    jokeCardActions: {
        marginLeft: width * 0.04,
        alignItems: 'center',
        flexDirection: 'row',
    },
    actionIcon: {
        resizeMode: 'contain',
        height: width * 0.098,
        width: width * 0.098,
        marginHorizontal: width * 0.01,
    },
});
