import React, { useEffect, useState, useRef } from 'react';
import {
    TouchableOpacity,
    Text, Image, Platform, View,
    Dimensions,
    Share,
    Animated,
    PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const walldragons = [
    {
        id: 0,
        image: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/walldragons/multikdrgn.png'),
        price: 0,
    },
    {
        image: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/walldragons/wall1.png'),
        price: 15,
        id: 6,
    },
    {
        id: 2,
        price: 15,
        image: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/walldragons/beautflwal.png'),
    },
    {
        id: 1,
        price: 25,
        image: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/walldragons/greenwithyellow.png'),
    },
    {
        id: 4,
        price: 25,
        image: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/walldragons/secnwal.png'),
    },
    {
        id: 5,
        price: 25,
        image: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/walldragons/seieng.png'),
    },
];

const YELLOW = '#F0B100';
const DARK = '#181C2B';

export default function RewardsAsAnImages() {
    const [fangs, setFangs] = useState(0);
    const [unlocked, setUnlocked] = useState<number[]>([]);
    const [banner, setBanner] = useState('');
    const bannerAnim = useRef(new Animated.Value(0)).current;
    const viewShotRefs = useRef<any[]>([]);

    // Завантаження фангів та відкритих
    useEffect(() => {
        (async () => {
            const f = await AsyncStorage.getItem('fangs');
            setFangs(f ? parseInt(f, 10) : 0);
            const u = await AsyncStorage.getItem('unlockedWallpapers');
            if (u) setUnlocked(JSON.parse(u));
            else {
                setUnlocked([0]);
                await AsyncStorage.setItem('unlockedWallpapers', JSON.stringify([0]));
            }
        })();
    }, []);

    // Банер
    const showBanner = (msg: string) => {
        setBanner(msg);
        Animated.sequence([
            Animated.timing(bannerAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.delay(1200),
            Animated.timing(bannerAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
    };

    // Купити
    const buy = async (id: number, price: number) => {
        if (fangs < price) {
            showBanner('Not enough fangs');
            return;
        }
        const newFangs = fangs - price;
        const newUnlocked = [...unlocked, id];
        setFangs(newFangs);
        setUnlocked(newUnlocked);
        await AsyncStorage.setItem('fangs', String(newFangs));
        await AsyncStorage.setItem('unlockedWallpapers', JSON.stringify(newUnlocked));
        showBanner('Unlocked!');
    };

    // Android permission
    const askAndroidPerm = async () => {
        if (Platform.OS !== 'android') return true;
        try {
            const apiLevel = Platform.Version;
            if (apiLevel >= 33) {
                const granted = await PermissionsAndroid.request(
                    'android.permission.READ_MEDIA_IMAGES' as any,
                    {
                        title: 'Media Permission Required',
                        message: 'App needs access to your media to save walldragons',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to save walldragons',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        } catch (err) {
            return false;
        }
    };

    // Зберегти
    const handleSave = async (idx: number) => {
        try {
            if (Platform.OS === 'android') {
                const hasPerm = await askAndroidPerm();
                if (!hasPerm) {
                    showBanner('Permission denied');
                    return;
                }
            }
            const uri = await viewShotRefs.current[idx]?.capture();
            if (!uri) throw new Error('Failed to capture');
            await CameraRoll.save(uri, { type: 'photo' });
            showBanner('Saved to gallery!');
        } catch (e: any) {
            showBanner('Error saving');
        }
    };

    // Поділитись
    const handleShare = async (idx: number) => {
        try {
            const uri = await viewShotRefs.current[idx]?.capture();
            if (!uri) throw new Error('Failed to capture');
            await Share.share({ url: uri });
        } catch (e) {
            showBanner('Error sharing');
        }
    };

    // --- UI ---
    return (
        <View style={{ alignItems: 'center', flex: 1, }}>
            {/* Банер */}
            {banner !== '' && (
                <Animated.View style={{
                    alignItems: 'center',
                    right: width * 0.1,
                    top: height * 0.28,
                    zIndex: 10, position: 'absolute', backgroundColor: '#1D293D', opacity: bannerAnim,
                    shadowOpacity: 0.3,
                    borderColor: '#F0B100',
                    borderRadius: width * 0.04,
                    paddingVertical: height * 0.018,
                    elevation: 8,
                    left: width * 0.1,
                    shadowRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    borderWidth: width * 0.0025,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: YELLOW,
                        fontSize: width * 0.05,
                    }}>{banner}</Text>
                </Animated.View>
            )}

            <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: width * 0.03,
                justifyContent: 'space-between',
                width: width * 0.91,
            }}>
                <View style={{
                    width: '64%',
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: width * 0.07,
                        textAlign: 'left',
                        color: '#F0B100',
                        fontFamily: 'georgia',
                    }}>
                        Rewards
                    </Text>
                    <Text style={{
                        textAlign: 'left',
                        color: '#CAD5E2',
                        marginTop: width * 0.016,
                        fontSize: width * 0.037,
                    }}>
                        Trade fangs for exclusive wallpapers.
                    </Text>
                </View>
                {/* Fangs */}
                <View style={{
                    borderColor: "rgba(240, 177, 0, 0.5)",
                    borderWidth: width * 0.003,
                    alignItems: 'center',
                    backgroundColor: 'rgba(240, 177, 0, 0.2)',
                    paddingHorizontal: width * 0.045,
                    height: height * 0.055,
                    borderRadius: width * 0.07, justifyContent: 'center', width: width * 0.31,
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: width * 0.06,
                        fontWeight: 'bold',
                        color: YELLOW,
                        marginRight: width * 0.018,
                    }}>
                        {fangs}
                    </Text>
                    <Text style={{
                        color: "rgba(240, 177, 0, 1)",
                        fontWeight: 'bold',
                        fontSize: width * 0.041,
                    }}>
                        FANGS
                    </Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: height * 0.19 }}>


                {/* Grid */}
                <View style={{
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: width * 0.05,
                    width: width,
                    flexDirection: 'row',
                }}>
                    {walldragons.map((wall, idx) => {
                        const isUnlocked = unlocked.includes(wall.id);
                        return (
                            <View key={wall.id} style={{
                                borderRadius: width * 0.055,
                                width: width * 0.41, margin: width * 0.025, overflow: 'hidden',
                                backgroundColor: '#10131A',
                                opacity: isUnlocked ? 1 : 0.7,
                                height: width * 0.56,
                                borderWidth: 2,
                                borderColor: isUnlocked ? YELLOW : '#232B3B',
                            }}>
                                <ViewShot
                                    ref={ref => viewShotRefs.current[idx] = ref}
                                    options={{ quality: 1, format: 'png', result: 'tmpfile' }}
                                    style={{
                                        borderTopRightRadius: width * 0.055,
                                        height: '100%',
                                        borderTopLeftRadius: width * 0.055,
                                        overflow: 'hidden',
                                        width: '100%',
                                        backgroundColor: '#222',
                                    }}
                                >
                                    <Image source={wall.image} style={{
                                        borderTopRightRadius: width * 0.055,
                                        height: '100%',
                                        borderTopLeftRadius: width * 0.055,
                                        width: '100%',
                                    }} resizeMode="cover"
                                    />
                                </ViewShot>
                                {/* Bottom panel */}
                                <View style={{
                                    paddingHorizontal: width * 0.03,
                                    borderBottomRightRadius: width * 0.055,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: width * 0.03,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    borderBottomLeftRadius: width * 0.055,
                                    bottom: height * 0.01,
                                }}>
                                    {isUnlocked ? (
                                        <>
                                            {Platform.OS !== 'android' && (
                                                <TouchableOpacity
                                                    style={{
                                                        alignItems: 'center',
                                                        width: '48%',
                                                        height: height * 0.046,
                                                        borderRadius: width * 0.025,
                                                        backgroundColor: YELLOW,
                                                        justifyContent: 'center',
                                                    }}
                                                    onPress={() => handleSave(idx)}
                                                >
                                                    <Image
                                                        style={{



                                                            tintColor: DARK,

                                                            width: width * 0.053,

                                                            height: width * 0.053,
                                                        }}
                                                        resizeMode="contain"
                                                        source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/savetogal.png')}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity
                                                style={{
                                                    width: '80%',
                                                    backgroundColor: '#1D293D',
                                                    height: height * 0.046,
                                                    borderColor: '#45556C',
                                                    borderRadius: width * 0.03,
                                                    alignItems: 'center',
                                                    borderWidth: width * 0.0025,
                                                    justifyContent: 'center',
                                                }}
                                                onPress={() => handleShare(idx)}
                                            >
                                                <Image
                                                    source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/sharedts.png')}
                                                    style={{
                                                        width: width * 0.053,
                                                        height: width * 0.053,
                                                        tintColor: '#fff',
                                                    }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity
                                            style={{
                                                borderColor: '#d0870079',
                                                gap: width * 0.02,
                                                backgroundColor: '#1D293D',
                                                borderWidth: 2,
                                                flex: 1,
                                                borderRadius: width * 0.025,
                                                paddingVertical: height * 0.014,
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => buy(wall.id, wall.price)}
                                        >
                                            <Image
                                                source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/locker.png')}
                                                style={{
                                                    width: width * 0.05,
                                                    height: width * 0.05,
                                                }}
                                                resizeMode="contain"
                                            />
                                            <Text style={{
                                                color: '#FDC700',
                                                fontWeight: 'bold',
                                                fontSize: width * 0.045,
                                            }}>
                                                {wall.price} Fangs
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
