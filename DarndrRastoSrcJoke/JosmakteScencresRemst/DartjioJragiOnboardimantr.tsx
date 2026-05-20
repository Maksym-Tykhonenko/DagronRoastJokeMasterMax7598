import React, { useState as ErTyUiOpLkJhGfDs } from 'react';




const QwErTyUiOpAsDfGh = 'dfg9283hnfs9nzb920renf034-3m-2-jmmfn-f34fnb9nf';

import { useNavigation as ZxCvBnMqWeRtYuI } from '@react-navigation/native';




import { darostjofontskestr } from '../darostjofontskestr';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Image as PlMnBvCxZaSdFgHj,



    TouchableOpacity as VbNmLpOiUyTrEwQz,
    useWindowDimensions as AzWsXcDeRfVtGbHn,
    View as UiOpLkJhGfDsAzXc,
    Text as RtFgVbNmLpOiUyTg,




    SafeAreaView as YhGtFrEdSwQzXcV,
} from 'react-native';
export default function XcVbNmLpOiUyTrEwQ() {
    const SwQzXcVbNmLpOiUy = ZxCvBnMqWeRtYuI();
    const { width: DeRfVtGbHnJmKlOp, height: WsXcDeRfVtGbHnJm } = AzWsXcDeRfVtGbHn();
    const [QzXcVbNmLpOiUyTr, UiOpLkJhGfDsAzXv] = ErTyUiOpLkJhGfDs(0);

    const CvBnMqWeRtYuIoPl = [
        {
            opcripsin: `Prepare yourself for fiery humor, epic roasting, and legendary jokes that are hotter than a dragon's breath.`,
            zimgrn: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/wlclainr.png'),
            toptxte: `Welcome`,
        },
        {
            opcripsin: `Encounter three unique personalities: The Smart, The Lazy, and The Perfectionist. Each breathes their own brand of sarcasm.`,
            toptxte: `Meet the Dragons`,
            zimgrn: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/meet.png'),
        },
        {
            toptxte: `Save Your Favorites`,
            opcripsin: `Store your favorite roasts in the Dragon's Hoard so you never forget a brilliant comeback.`,
            zimgrn: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/dgnBook.png'),
        },
        {
            opcripsin: `Play our mini-game to finish the joke. Earn Dragon Fangs for every correct answer you make in time!`,
            zimgrn: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/tastewit.png'),
            toptxte: `Test Your Wit`,
        },
        {
            opcripsin: `Trade your hard-earned Dragon Fangs for epic, exclusive wallpapers. Let the adventure begin!`,
            zimgrn: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/roasonboards/unlockrewds.png'),
            toptxte: `Unlock Exclusive Rewards`,
        },
    ];

    const FrEdSwQzXcVbNmLk = async () => {
        if (QzXcVbNmLpOiUyTr < CvBnMqWeRtYuIoPl.length - 1) {
            UiOpLkJhGfDsAzXv(v => v + 1);
        } else {
            try {
                await AsyncStorage.setItem(QwErTyUiOpAsDfGh, 'zorked');
            } catch (TyUiOpLkJhGfDsAz) {
                if (__DEV__) console.warn('XcvBnmLkjHgFdSa::fail', TyUiOpLkJhGfDsAz);
            }
            SwQzXcVbNmLpOiUy.replace?.('SjockengWrapDekno');
        }
    };

    return (
        <UiOpLkJhGfDsAzXc style={{ justifyContent: 'flex-end',
        
         alignItems: 'center',
        paddingBottom: WsXcDeRfVtGbHnJm * 0.05,flex: 1, height: WsXcDeRfVtGbHnJm,
        
        
         width: DeRfVtGbHnJmKlOp, 
        }}>
            <YhGtFrEdSwQzXcV />
            <PlMnBvCxZaSdFgHj resizeMode="cover" style={{  width: DeRfVtGbHnJmKlOp,position: 'absolute', height: WsXcDeRfVtGbHnJm, }} source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/firedground.png')} />

            <PlMnBvCxZaSdFgHj resizeMode={QzXcVbNmLpOiUyTr === 1 ? 'stretch' : "contain"} source={CvBnMqWeRtYuIoPl[QzXcVbNmLpOiUyTr].zimgrn}
            
            style={{


                width: DeRfVtGbHnJmKlOp * 0.79,






                height: DeRfVtGbHnJmKlOp * 0.79, 
            }} />

            <UiOpLkJhGfDsAzXc style={{
                paddingVertical: WsXcDeRfVtGbHnJm * 0.021,


                paddingHorizontal: DeRfVtGbHnJmKlOp * 0.05,
                alignSelf: 'center',  height: WsXcDeRfVtGbHnJm * 0.21,
                width: DeRfVtGbHnJmKlOp * 0.9,
                marginTop: QzXcVbNmLpOiUyTr === 1 ? 0 : WsXcDeRfVtGbHnJm * 0.07,




                alignItems: 'center', 

                justifyContent: 'space-between',
            }}>
                <RtFgVbNmLpOiUyTg style={{
                textAlign: 'center',
                fontWeight: 'bold',
                    fontFamily: 'georgia',
                    color: '#F0B100',
                    fontSize: DeRfVtGbHnJmKlOp * 0.07,
                }}>
                    {CvBnMqWeRtYuIoPl[QzXcVbNmLpOiUyTr].toptxte}
                </RtFgVbNmLpOiUyTg>
                <RtFgVbNmLpOiUyTg style={{
                    color: '#CAD5E2', fontSize: DeRfVtGbHnJmKlOp * 0.04, fontFamily: darostjofontskestr.ashmanrR, textAlign: 'center',
                }}>
                    {CvBnMqWeRtYuIoPl[QzXcVbNmLpOiUyTr].opcripsin}
                </RtFgVbNmLpOiUyTg>
            </UiOpLkJhGfDsAzXc>

            <VbNmLpOiUyTrEwQz style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: WsXcDeRfVtGbHnJm * 0.019,
                width: DeRfVtGbHnJmKlOp * 0.91, 
                borderRadius: DeRfVtGbHnJmKlOp * 0.03,
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#E09D01',
                height: WsXcDeRfVtGbHnJm * 0.068,
            }} onPress={FrEdSwQzXcVbNmLk}>
                <RtFgVbNmLpOiUyTg style={{
                    fontSize: DeRfVtGbHnJmKlOp * 0.05,
                    textAlign: 'center',
fontWeight: 'bold',
                     color: '#020618',  
                }}>
                    {
                        QzXcVbNmLpOiUyTr === 0 ? 'Next' :
                            QzXcVbNmLpOiUyTr === 1 ? 'Okay' :
                                QzXcVbNmLpOiUyTr === 2 ? 'Continue' : QzXcVbNmLpOiUyTr === 3 ? 'Understood' : 'Start'
                    }
                </RtFgVbNmLpOiUyTg>

                <PlMnBvCxZaSdFgHj source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/rightarrw.png')} style={{
                    height: DeRfVtGbHnJmKlOp * 0.04,
                    resizeMode: 'contain',
                    marginLeft: DeRfVtGbHnJmKlOp * 0.02,
                    width: DeRfVtGbHnJmKlOp * 0.04,
                }} />
            </VbNmLpOiUyTrEwQz>
        </UiOpLkJhGfDsAzXc>
    );
}
