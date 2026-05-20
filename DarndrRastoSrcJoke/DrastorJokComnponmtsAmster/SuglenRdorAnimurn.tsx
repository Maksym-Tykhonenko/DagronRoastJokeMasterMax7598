import { WebView } from 'react-native-webview';
import {
  Dimensions,
  View,
} from 'react-native';

const SuglenRdorAnimurn = () => {
  const dimensions = Dimensions.get('window');

  const sfsjpwijf = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* From Uiverse.io by cohencoo */ 
        .custom-loader {
          width: 70px;
          height: 70px;
          background: #ffa600;
          border-radius: 50px;
          -webkit-mask: radial-gradient(circle 31px at 50% calc(100% + 13px),#000 95%,#0000) top 4px left 50%,
            radial-gradient(circle 31px,#000 95%,#0000) center,
            radial-gradient(circle 31px at 50% -13px,#000 95%,#0000) bottom 4px left 50%,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          -webkit-mask-repeat: no-repeat;
          animation: cu10 1.5s infinite;
        }

        @keyframes cu10 {
          0% {
            -webkit-mask-size: 0    18px,0    18px,0    18px,auto
          }

          16.67% {
            -webkit-mask-size: 100% 18px,0    18px,0    18px,auto
          }

          33.33% {
            -webkit-mask-size: 100% 18px,100% 18px,0    18px,auto
          }

          50% {
            -webkit-mask-size: 100% 18px,100% 18px,100% 18px,auto
          }

          66.67% {
            -webkit-mask-size: 0    18px,100% 18px,100% 18px,auto
          }

          83.33% {
            -webkit-mask-size: 0    18px,0    18px,100% 18px,auto
          }

          100% {
            -webkit-mask-size: 0    18px,0    18px,0    18px,auto
          }
        }

        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: transparent;
        }
      </style>
    </head>
    <body>
      <div class="custom-loader"></div>
    </body>
    </html>
  `;

  return (
    <View style={{ width: dimensions.width * 0.9, flex: 0, alignSelf: 'center', height: dimensions.height * 0.3 }}>
      <WebView
        scrollEnabled={false}
        mediaPlaybackRequiresUserAction={false}
        showsVerticalScrollIndicator={false}
        mixedContentMode="compatibility"



        domStorageEnabled={true}
        scalesPageToFit={false}
        source={{ html: sfsjpwijf }}
        style={{ backgroundColor: 'transparent', height: '100%', width: '100%', }}
        
        
        
        
        
        
        showsHorizontalScrollIndicator={false}



        bounces={false}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        startInLoadingState={false}
      />
    </View>
  );
};

export default SuglenRdorAnimurn;