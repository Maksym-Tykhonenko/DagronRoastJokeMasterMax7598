const QwErTgByHnUjMiK = 'cyvut5790-iuhy432axvi00-98ybyw89j98765fr6tg7y8u9-00iuhbvr43sed5cv68u9';
import { SafeAreaView as AzWsXcDeRfVtGbHn } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LkJhGfDsAzXcVbNm from '../DrastorJokComnponmtsAmster/SuglenRdorAnimurn';
import { useNavigation as PlMnBvCxZaSdFgHj } from '@react-navigation/native';
import { Image as UiOpLkJhGfDsAzXc, Dimensions as VbNmQwErTyUiOpLk,} from 'react-native';
import React, {
    useState as YhGtFrEdSwQzXcV,
    useEffect as RtFgVbNmLpOiUyT,
} from 'react';

const XcVbNmLpOiUyTrEw = (): React.ReactElement => {
    const QzWsXcDeRfVtGbH = PlMnBvCxZaSdFgHj();
    const { width: ErTyUiOpLkJhGfD, height: SwQzXcVbNmLpOiU } = VbNmQwErTyUiOpLk.get('window');
    {/** 
    RtFgVbNmLpOiUyT(() => {
        let PlOkMnIjUhYgTfR = true;
        const DeRfVtGbHnJmKlO = Math.floor(Math.random() * 900);

        // Navigation logic (after loader)
        const WsXcDeRfVtGbHnJ = setTimeout(async () => {
            try {
                const UiOpLkJhGfDsAzX = await AsyncStorage.getItem(QwErTgByHnUjMiK);
                if (!UiOpLkJhGfDsAzX) {
                    await AsyncStorage.setItem(QwErTgByHnUjMiK, 'scratched');
                }
                if (!PlOkMnIjUhYgTfR) return;
                QzWsXcDeRfVtGbH.replace(
                    UiOpLkJhGfDsAzX ? 'SjockengWrapDekno' : 'DartjioJragiOnboardimantr'
                );
            } catch (CvBnMqWeRtYuIoP) {
                if (__DEV__) console.warn('DarsortGarndLoadingKojer::fail', CvBnMqWeRtYuIoP);
            }
        }, 3500 + 1700 + 1000 + DeRfVtGbHnJmKlO);

        return () => {
            PlOkMnIjUhYgTfR = false;
            clearTimeout(YhGtFrEdSwQzXcV);
            clearTimeout(WsXcDeRfVtGbHnJ);
        };
    }, [QzWsXcDeRfVtGbH, QwErTgByHnUjMiK, SwQzXcVbNmLpOiU]);*/}

    return (
        <AzWsXcDeRfVtGbHn style={{
            justifyContent: 'center', flex: 1, width: ErTyUiOpLkJhGfD, 
            height: SwQzXcVbNmLpOiU, alignItems: 'center',
        }}>
            <UiOpLkJhGfDsAzXc resizeMode="cover" style={{position: 'absolute', width: ErTyUiOpLkJhGfD, zIndex: 0,  height: SwQzXcVbNmLpOiU * 1.2023421,  }} source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/firedground.png')} />
            <UiOpLkJhGfDsAzXc resizeMode="contain" style={{




                borderColor: '#F0B100',

                borderRadius: ErTyUiOpLkJhGfD * 0.14,



                zIndex: 0,

                width: ErTyUiOpLkJhGfD * 0.79,





                borderWidth: ErTyUiOpLkJhGfD * 0.004,

            height: ErTyUiOpLkJhGfD * 0.79,
            }} 
            source={require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/malicno.png')} />
            <LkJhGfDsAzXcVbNm />
        </AzWsXcDeRfVtGbHn>
    );
};

export default XcVbNmLpOiUyTrEw;
