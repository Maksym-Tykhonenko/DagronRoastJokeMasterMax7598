import React from 'react';
import { View as AzWsXcDeRfVtGbH, TouchableOpacity as PlOkMnIjUhYgTfR, Dimensions as QwErTyUiOpAsDfGh, Image as CvBnMqWeRtYuIoP, Text as UiOpLkJhGfDsAzXc} from 'react-native';
const { width: JkLpOiUyTrEwQzX, height: MnBvCxZaSdFgHjK } = QwErTyUiOpAsDfGh.get('window');

const RtFgVbNmLpOiUyTg = [
    {
        palgazynru: 'Jokes', imgegle: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/icnofnibtnm/jokes.png'),
    },
    {
        imgegle: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/icnofnibtnm/saved.png'),
        palgazynru: 'Saved',
    },
    {
        palgazynru: 'Write',
        imgegle: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/icnofnibtnm/write.png'),
    },
    {
        imgegle: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/icnofnibtnm/game.png'),
        palgazynru: 'Game',
    },
    {
        palgazynru: 'Rewards',
        imgegle: require('../AkeoRokesttAisiesetsMetrs/EgrodioImagesiosRaograf/icnofnibtnm/rewards.png'),
    },
];

type YhGtFrEdSwQzXcVb = {
    klypt: string;
    steLykipterNfo: (val: any) => void;
};

const WsXcDeRfVtGbHnJm: React.FC<YhGtFrEdSwQzXcVb> = ({ klypt, steLykipterNfo }) => {
    const OpLkJhGfDsAzXcVb = RtFgVbNmLpOiUyTg.findIndex(btn => btn.palgazynru === klypt);

    return (
        <AzWsXcDeRfVtGbH style={{
            width: JkLpOiUyTrEwQzX,




            justifyContent: 'center',

            height: MnBvCxZaSdFgHjK * 0.111,


            zIndex: 10,

            backgroundColor: 'rgba(0, 0, 0, 0.8)', 

             overflow: 'hidden',
             alignItems: 'flex-start',
             bottom: 0, position: 'absolute',




             borderColor: 'rgba(208, 135, 0, 0.5)',
             borderTopWidth: JkLpOiUyTrEwQzX * 0.0035,
             alignSelf: 'center', 
        }}>
            <AzWsXcDeRfVtGbH style={{ justifyContent: 'space-around', width: '98%', alignItems: 'flex-start', flexDirection: 'row', height: '100%', paddingTop: MnBvCxZaSdFgHjK * 0.01,  }}>
                {RtFgVbNmLpOiUyTg.map((btn, idx) => (
                    <PlOkMnIjUhYgTfR key={idx} onPress={() => steLykipterNfo(btn.palgazynru)}
                        style={{
                            alignItems: 'center',
                            height: MnBvCxZaSdFgHjK * 0.059,
                            width: MnBvCxZaSdFgHjK * 0.059,
                             justifyContent: 'center',
                        }}>
                        <CvBnMqWeRtYuIoP source={btn.imgegle} style={{
                            width: MnBvCxZaSdFgHjK * 0.035,
                            tintColor: idx === OpLkJhGfDsAzXcVb ? '#F0B100' : '#90A1B9',
                            height: MnBvCxZaSdFgHjK * 0.035,
                        }} resizeMode="contain"
                        />
                        <UiOpLkJhGfDsAzXc style={{
                            color: idx === OpLkJhGfDsAzXcVb ? '#F0B100' : '#90A1B9',
                            fontWeight: '600',
                            marginTop: MnBvCxZaSdFgHjK * 0.005,
                            fontSize: JkLpOiUyTrEwQzX * 0.03, 
                        }}>
                            {btn.palgazynru}
                        </UiOpLkJhGfDsAzXc>
                    </PlOkMnIjUhYgTfR>
                ))}
            </AzWsXcDeRfVtGbH>
        </AzWsXcDeRfVtGbH>
    );
};

export default WsXcDeRfVtGbHnJm;
