import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useEmailStore} from 'store/signup/signUpStore';
import {useNavigation} from '@react-navigation/native';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

export default function Home() {
  const navigation = useNavigation();

  const handleEmail = useEmailStore(state => state.handleEmail);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '740602482619-0fekkor4v48tnskj5412hup32fhpc59i.apps.googleusercontent.com',
    });
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      handleEmail(userInfo?.user.email);

      if (userInfo) {
        return navigation.navigate('SignUp' as never);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeContainer>
      <ButtonContainer>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleLogin}
          disabled={false}
        />
      </ButtonContainer>
      {/* <GoogleMap /> */}
    </HomeContainer>
  );
}

const HomeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${palette.white};
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 80px;
  left: 10%;
`;
