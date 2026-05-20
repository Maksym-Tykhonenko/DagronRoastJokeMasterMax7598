import React, { useState, useEffect, useRef } from 'react';
const ShareIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/sharedts.png');
const RetryIcon = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/reloadagain.png');
const { width, height } = Dimensions.get('window');

const dragonSize = width * 0.55;
const inputHeight = height * 0.12;
const inputRadius = width * 0.04;
const buttonHeight = height * 0.07;

import {
    Image, View, Text, TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    TextInput,
    Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const buttonRadius = width * 0.04;
const resultRadius = width * 0.05;
const resultPadding = width * 0.06;

const DRAGON_IMAGE = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/meet.png'); // Можна замінити на локальний шлях

export default function RoastTellAndSeeYouHumor({ setScene }: any) {
    const [joke, setJoke] = useState('');
    const [result, setResult] = useState<null | 'good' | 'bad'>(null);
    const [fangs, setFangs] = useState(0);
    const fangsAddedRef = useRef(false);
    const fangsUpdatePromiseRef = useRef<Promise<void> | null>(null);

    useEffect(() => {
        // Завантажити поточну кількість fangs при монтуванні
        const loadFangs = async () => {
            try {
                const stored = await AsyncStorage.getItem('fangs');
                if (stored !== null) setFangs(Number(stored));
            } catch (e) {}
        };
        loadFangs();
    }, []);

    useEffect(() => {
        // Додаємо +2 fangs тільки коли result стає good/bad (не null)
        if (result && !fangsAddedRef.current) {
            fangsAddedRef.current = true;
            // Використовуємо окрему async-функцію для гарантії послідовності
            const updateFangs = async () => {
                try {
                    // Завжди читаємо актуальне значення з AsyncStorage
                    const stored = await AsyncStorage.getItem('fangs');
                    const current = stored ? Number(stored) : 0;
                    const newFangs = current + 2;
                    await AsyncStorage.setItem('fangs', String(newFangs));
                    setFangs(newFangs);
                } catch (e) {}
            };
            // Викликаємо і зберігаємо проміс
            const promise = updateFangs();
            fangsUpdatePromiseRef.current = promise;
        }
        if (!result) {
            fangsAddedRef.current = false;
        }
    }, [result]);

    const handleTellDragon = () => {
        // Рандомно good/bad
        setResult(Math.random() > 0.5 ? 'good' : 'bad');
    };

    const handleTryAgain = async () => {
        // Дочекатись завершення оновлення fangs перед скиданням стану
        if (fangsUpdatePromiseRef.current) {
            await fangsUpdatePromiseRef.current;
        }
        setResult(null);
        setJoke('');
    };

    // Якщо ви використовуєте setScene для переходу на інший екран, обгорніть його аналогічно:
    // const handleGoToNextScene = async () => {
    //     if (fangsUpdatePromiseRef.current) {
    //         await fangsUpdatePromiseRef.current;
    //     }
    //     setScene(...);
    // };

    // Кнопки для .map
    const buttons = [
        {
            key: 'share',
            label: 'Share',
            icon: ShareIcon,
            onPress: () => {
                Share.share({
                    message: `I just told the dragon: "${joke}" and it said my humor is ${result === 'good' ? 'top notch!' : 'as dry as a desert...'}`
                })
            },
        },
        {
            key: 'tryAgain',
            label: 'Try Again',
            icon: RetryIcon,
            onPress: handleTryAgain,
        },
    ];

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1,alignItems: 'center', width: '100%' }}>
                    {!result && (
                        <>
                            <Image source={DRAGON_IMAGE} style={{
                                    height: dragonSize,
                                    marginBottom: height * 0.03,
                                    alignSelf: 'center',
                                    width: dragonSize,
                                }} resizeMode="contain"
                            />
                            <View style={{
                                borderColor: '#314158',
                                borderRadius: inputRadius,
                                width: width * 0.9,
                                backgroundColor: '#181C2B',
                                padding: width * 0.05,
                                minHeight: inputHeight,
                                    justifyContent: 'center',
                                    borderWidth: width * 0.003,
                                    marginBottom: height * 0.03,
                                }}
                            >
                                <TextInput
                                    placeholder="Type your hilarious joke here..."
                                    onChangeText={setJoke}
                                    placeholderTextColor="#62748E"
                                    value={joke}
                                    style={{    color: '#fff', fontSize: width * 0.05, minHeight: inputHeight * 0.7,
                                    }} multiline
                                />
                            </View>
                            <TouchableOpacity onPress={handleTellDragon} style={{
                                    backgroundColor: '#F0B100',
                                    borderRadius: buttonRadius,
                                    justifyContent: 'center',
                                    width: width * 0.9,
                                    alignItems: 'center',
                                    marginTop: height * 0.01,
                                    height: buttonHeight,
                                    opacity: joke.trim() ? 1 : 0.5,
                                }} disabled={!joke.trim()}
                            >
                                <Text style={{
                                    color: '#181C2B',
                                    fontSize: width * 0.05,
                                    fontWeight: 'bold',
                                }}>
                                    Tell the Dragon
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {result && (
                        <>
                            {/* Вивід жарту у стилі поля вводу */}
                            <View
                                style={{
                                    alignSelf: 'center',
                                    padding: width * 0.05,
                                    minHeight: inputHeight,
                                    backgroundColor: '#181C2B',
                                    marginBottom: height * 0.025,
                                    borderColor: '#314158',
                                    width: width * 0.9,
                                    justifyContent: 'center',
                                    borderWidth: width * 0.003,
                                    borderRadius: inputRadius,
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: width * 0.05,
                                        minHeight: inputHeight * 0.7,
                                    }}
                                >
                                    {joke}
                                </Text>
                            </View>
                            <View
                                style={{
                                    borderWidth: width * 0.003,
                                    padding: resultPadding,
                                    borderRadius: resultRadius,
                                    width: width * 0.91,
                                    backgroundColor: result === 'good' ? 'rgba(24, 130, 40, 0.4)' : 'rgba(130, 24, 26, 0.4)',
                                    alignItems: 'center',
                                    marginTop: height * 0.03,
                                    borderColor: result === 'good' ? 'rgba(99, 251, 44, 0.5)' : 'rgba(251, 44, 54, 0.5)',
                                }}
                            >
                                <Image source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/oklyk.png')} style={{
                                        height: width * 0.14,



                                        tintColor: result === 'good' ? '#64FF76' : '#FF6467',

                                        marginBottom: height * 0.02,

                                        width: width * 0.14,
                                    }}
                                    resizeMode='contain'
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: width * 0.07,
                                    marginBottom: height * 0.01,
                                    fontFamily: 'georgia',
                                    color: '#fff',
                                    textAlign: 'center',
                                }}>
                                    {result === 'good' ? 'This is very funny.' : 'Could Be Better...'}
                                </Text>
                                {/* Опис з рискою ліворуч */}
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginBottom: height * 0.03,
                                    width: '100%',
                                    alignSelf: 'flex-start',
                                }}>
                                    <View style={{
                                        backgroundColor: 'rgba(255,255,255,0.7)',
                                        height: '100%',
                                        alignSelf: 'stretch',
                                        borderRadius: 2,
                                        marginRight: width * 0.025,
                                        width: 3,
                                    }} />
                                    <Text style={{
                                        textAlign: 'left',
                                        fontSize: width * 0.045,
                                        flex: 1,
                                        fontStyle: 'italic',
                                        color: '#fff',
                                    }}>
                                        {result === 'good'
                                            ? '"Your humor is top notch."'
                                            : '"Your humor is as dry as a desert."'}
                                    </Text>
                                </View>
                                {/* Кнопки через .map */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                                    {buttons.map(btn => (
                                        <TouchableOpacity
                                            key={btn.key}
                                            style={{
                                                flexDirection: 'row',
                                                paddingVertical: height * 0.018,
                                                borderRadius: buttonRadius * 0.7,
                                                marginRight: btn.key === 'share' ? width * 0.02 : 0,
                                                marginLeft: btn.key === 'tryAgain' ? width * 0.02 : 0,
                                                flex: 1,
                                                alignItems: 'center',
                                                backgroundColor: 'rgba(255, 255, 255, 0.21)',
                                                justifyContent: 'center',
                                            }}
                                            onPress={btn.onPress}
                                        >
                                            <Image   source={btn.icon} style={{
                                                height: width * 0.06,
                                                marginRight: width * 0.025,
                                                tintColor: '#fff',
                                                width: width * 0.06,
                                                }}  resizeMode="contain"
                                            />
                                            <Text style={{
                                                fontSize: width * 0.045,
                                                fontWeight: 'bold',
                                                color: '#fff',
                                            }}>
                                                {btn.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            <TouchableOpacity style={{
                                    width: width * 0.91,
                                    alignSelf: 'center',
                                    backgroundColor: '#F0B100',
                                    alignItems: 'center',
                                    borderRadius: buttonRadius,
                                    paddingVertical: height * 0.018,
                                    marginTop: height * 0.04,
                                }}
                                onPress={handleTryAgain}
                            >
                                <Text style={{ color: '#181C2B', fontWeight: 'bold', fontSize: width * 0.05,}}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
