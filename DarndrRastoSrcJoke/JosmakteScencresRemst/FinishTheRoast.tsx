const { width, height } = Dimensions.get('window');
import quizData from '../AkeoRokesttAisiesetsMetrs/quizData';
const DRAGON_START = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/quiezdrgn.png');
const DRAGON_COMPLETE = require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/unlockrewds.png');
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState,
     useRef,
     
     useEffect } from 'react';

const ANSWER_BG = 'rgba(29, 41, 61, 0.8)';
const ANSWER_BORDER = 'rgba(69, 85, 108, 1)';
const CORRECT_BG = 'rgba(24, 130, 40, 0.4)';
const WRONG_BG = 'rgba(130, 24, 26, 0.4)';
const YELLOW = '#F0B100';

export default function FinishTheRoast({ setScene }: any) {
    const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [timer, setTimer] = useState(10);
    const [timerActive, setTimerActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [questions, setQuestions] = useState<any[]>([]);

    // Start timer on quiz step
    useEffect(() => {
        if (step === 'quiz' && timerActive) {
            timerRef.current = setInterval(() => {
                setTimer(t => {
                    if (t <= 1) {
                        clearInterval(timerRef.current!);
                        setTimerActive(false);
                        setSelected(-1); // no answer
                        setTimeout(() => goNext(), 800);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current!);
    }, [step, timerActive, current]);

    const startGame = () => {
        // Вибираємо 5 рандомних різних питань
        const shuffled = [...quizData].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 5));
        setStep('quiz');
        setCurrent(0);
        setCorrectCount(0);
        setTimer(10);
        setSelected(null);
        setTimerActive(true);
    };

    const selectAnswer = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        setTimerActive(false);
        if (idx === questions[current].correct && timer > 0) {
            setCorrectCount(c => c + 1);
        }
        setTimeout(() => goNext(), 800);
    };

    const goNext = () => {
        if (current + 1 < questions.length) {
            setCurrent(c => c + 1);
            setTimer(10);
            setSelected(null);
            setTimerActive(true);
        } else {
            // Додаємо фанги до AsyncStorage при завершенні
            addFangs(correctCount * 2);
            setStep('result');
        }
    };

    // Додаємо функцію для отримання fangів з AsyncStorage
    useEffect(() => {
        const loadFangs = async () => {
            try {
                const stored = await AsyncStorage.getItem('fangs');
                // setFangs(stored ? parseInt(stored, 10) : 0);
            } catch (e) {}
        };
        loadFangs();
    }, []);

    // Додаємо функцію для оновлення fangів у AsyncStorage
    const addFangs = async (amount: number) => {
        try {
            const stored = await AsyncStorage.getItem('fangs');
            const prev = stored ? parseInt(stored, 10) : 0;
            const updated = prev + amount;
            await AsyncStorage.setItem('fangs', updated.toString());
            // setFangs(updated);
        } catch (e) {}
    };

    // --- UI ---
    if (step === 'start') {
        return (
            <View style={{ 
                
                alignItems: 'center',

                flex: 1, 
                
                
                backgroundColor: 'transparent' }}>
                <Image source={DRAGON_START} style={{
                        marginTop: height * 0.01,
                        width: width * 0.7,
                        height: width * 0.61,
                        marginBottom: height * 0.04,
                    }} resizeMode="contain"
                />
                <Text style={{
                    fontFamily: 'Georgia',
                    fontSize: width * 0.09,
                    color: YELLOW,

                    textAlign: 'center',
                    marginBottom: height * 0.02,




                    fontWeight: 'bold',
                }}>
                    Finish the Roast
                </Text>
                <Text style={{
                    paddingHorizontal: width * 0.08,



                    fontSize: width * 0.045,

                    marginBottom: height * 0.09,

                    textAlign: 'center',
                    color: '#fff',
                }}>
                    Test your wits against the Dragon's challenges. Earn 2 fangs for every correct answer in under 10 seconds!
                </Text>
                <TouchableOpacity style={{
                        
                        paddingVertical: height * 0.022,
                        
                        
                        marginBottom: height * 0.04,
                        backgroundColor: YELLOW,
                        
                        
                        borderRadius: width * 0.04,
                        width: width * 0.9,
                        alignItems: 'center',

                    }}  onPress={startGame}
                >
                    <Text style={{
                       
                       color: '#181C2B',
                       
                       
                       
                       
                       fontWeight: 'bold',
                       
                       fontSize: width * 0.055,
                    }}>
                        Start Game
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (step === 'quiz') {
        if (!questions.length) return null;
        const q = questions[current];
        return (
            <View style={{backgroundColor: 'transparent', flex: 1, alignItems: 'center',  }}>
                {/* Top bar */}
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: width * 0.06,
                    marginBottom: height * 0.01,
                    marginTop: height * 0.06,
                    width: '100%',
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        color: '#A9B6CE', fontSize: width * 0.045, fontWeight: '600',
                    }}>
                        Question {current + 1}/{questions.length}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image  source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/timer.png')} style={{
                                height: width * 0.055,
                                marginRight: width * 0.012,
                                width: width * 0.055,
                            }}
                            resizeMode="contain"
                        />
                        <Text style={{
                            fontWeight: 'bold',
                            fontVariant: ['tabular-nums'],
                            fontSize: width * 0.048,
                            color: YELLOW,
                        }}>
                            00:{timer.toString().padStart(2, '0')}
                        </Text>
                    </View>
                </View>
                {/* Progress bar */}
                <View style={{
                    marginBottom: height * 0.03,
                    overflow: 'hidden',
                    height: 7,
                    width: width * 0.88,
                    backgroundColor: '#232B3B',
                    borderRadius: 5,
                }}>
                    <View style={{
                        borderRadius: 5,
                        height: '100%',
                        width: `${(timer / 10) * 100}%`,
                        backgroundColor: YELLOW,
                    }} />
                </View>
                {/* Question */}
                <Text style={{
                    fontFamily: 'Georgia',
                    fontSize: width * 0.06,
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingHorizontal: width * 0.04,
                    marginBottom: height * 0.03,
                }}>
                    "{q.question}"
                </Text>
                {/* Answers */}
                <View style={{ width: width * 0.92 }}>
                    {q.answers.map((ans, idx) => {
                        let bg = ANSWER_BG;
                        if (selected !== null) {
                            if (idx === q.correct) bg = CORRECT_BG;
                            else if (idx === selected) bg = WRONG_BG;
                        }
                        return (
                            <TouchableOpacity disabled={selected !== null} activeOpacity={selected === null ? 0.7 : 1} key={idx}
                                onPress={() => selectAnswer(idx)}
                                style={{
                                    paddingVertical: height * 0.022,




                                    borderColor: ANSWER_BORDER,
                                    borderWidth: 2,
                                    borderRadius: width * 0.035,

                                    marginBottom: height * 0.018,

                                    backgroundColor: bg,

                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontWeight: '500', color: '#fff', fontSize: width * 0.048,}}>
                                    {ans}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {/* Back button */}
                <TouchableOpacity
                    style={{
                        height: width * 0.13,
                        bottom: height * 0.04,
                        width: width * 0.13,
                        position: 'absolute',
                        elevation: 2,
                        borderRadius: width * 0.065,
                        left: width * 0.04,
                        backgroundColor: YELLOW,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => setScene && setScene('back')}
                >
                    <Image resizeMode="contain" source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/back.png')} style={{
                            width: width * 0.07,
                            tintColor: '#181C2B',
                            height: width * 0.07,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    // --- Result screen ---
    if (step === 'result') {
        return (
            <View style={{
                
                
                
                flex: 1,
                
                alignItems: 'center',
                 backgroundColor: 'transparent' }}>
                <Image
                    source={DRAGON_COMPLETE}
                    style={{
                        marginBottom: height * 0.04,
                        height: width * 0.5,
                        marginTop: height * 0.01,
                        width: width * 0.5,
                    }}
                    resizeMode="contain"
                />
                <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: width * 0.07,
                    fontFamily: 'Georgia',
                    marginBottom: height * 0.02,
                    color: YELLOW,
                }}>
                    Challenge Complete!
                </Text>
                <View style={{
                    marginBottom: height * 0.04,
                    width: width * 0.85,
                    alignItems: 'center',
                    backgroundColor: 'rgba(15, 23, 43, 0.6)',
                    borderWidth: 1.5,
                    borderColor: '#FFC30044',
                    paddingVertical: height * 0.03,
                    borderRadius: width * 0.04,
                }}>
                    <Text style={{
                        fontSize: width * 0.045,
                        marginBottom: height * 0.01,
                        color: '#A9B6CE',
                    }}>
                        You got
                    </Text>
                    <Text style={{
                        fontSize: width * 0.11,
                        marginBottom: height * 0.01,
                        fontWeight: 'bold',
                        color: '#fff',
                    }}>
                        {correctCount}/{questions.length}
                    </Text>
                    <View style={{
                        marginVertical: height * 0.012,
                        height: 1,
                        width: '80%',
                        backgroundColor: '#fff2',
                    }} />
                    <Text style={{
                        color: YELLOW,
                        fontWeight: 'bold',
                        fontSize: width * 0.05,
                    }}>
                        Earned: +{correctCount * 2} Fangs
                    </Text>
                </View>
                {/* Share button */}
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between', alignItems: 'center', gap: width * 0.021,
                    width: width * 0.91,
                }}>
                    {/* Back button */}
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            height: height * 0.064,
                            borderRadius: width * 0.04,
                            elevation: 2,
                            backgroundColor: YELLOW,
                            justifyContent: 'center',
                            width: height * 0.064,
                        }}
                        onPress={() => {
                            setStep('start');
                            setCurrent(0);
                            setSelected(null);
                            setCorrectCount(0);
                            setTimer(10);
                            setTimerActive(false);
                        }}
                    >
                        <Image style={{ width: width * 0.07, height: width * 0.07, tintColor: '#181C2B',
                            }} resizeMode="contain"
                            source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/back.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderRadius: width * 0.04,
                            backgroundColor: YELLOW,
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                            height: height * 0.064,
                        }}
                        onPress={() => {
                            Share.share({
                                message: `I just completed the "Finish the Roast" challenge in Dragon's Lair and scored ${correctCount}/${quizData.length}! I earned ${correctCount * 2} fangs. Can you beat my score?`,
                            })
                        }}
                    >
                        <Image source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/sharedts.png')} style={{
                            height: width * 0.07,
                            tintColor: '#181C2B',
                            marginRight: width * 0.025,
                            width: width * 0.07,
                            }}
                            resizeMode="contain"
                        />
                        <Text style={{
                            color: '#181C2B',
                            fontWeight: 'bold',
                            fontSize: width * 0.055,
                        }}>
                            Share
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }

    return null;
}
