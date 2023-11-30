import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {useModalStore} from 'store/modal/modalStore';
import {storeUserSession} from 'utils/auth';

/** 로그인 **/
export const usePostIsSignIn = () => {
  const navigation = useNavigation();

  const useSignInMutation = useMutation(
    (email: string): Promise<AxiosResponse> =>
      axiosInstance.post('/auth/isuser', {email}),
    {
      onSuccess: async data => {
        const isUserSignIn = data?.data.data;

        if (!isUserSignIn) {
          return navigation.navigate('SignUp' as never);
        }

        return navigation.navigate('Main' as never);
      },

      onError: (error: AxiosError) => {
        console.error(error.status);
      },
    },
  );

  return {
    useSignInMutation,
  };
};

/** 회원가입  **/
export const usePostSignUp = () => {
  const config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };

  const useSignUpMutation = useMutation(
    (formData: FormData): Promise<AxiosResponse> =>
      axiosInstance.post('/users/signup', formData, config),
    {
      onSuccess: () => {},
      onMutate: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useSignUpMutation,
  };
};

/** 계정 삭제 회원가입  **/
export const usePostUserDelete = () => {
  const navigation = useNavigation();
  const handleVisible = useModalStore(state => state.handleVisible);

  const useUserDeleteMutation = useMutation(
    (): Promise<AxiosResponse> =>
      axiosInstance.delete('/users/me/delete/account'),
    {
      onSuccess: () => {
        handleVisible(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home' as never}],
        });
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useUserDeleteMutation,
  };
};

/** Refresh Token **/
export const useGetRefreshToken = () => {
  const useGetRefreshTokenMutation = useMutation(
    (serverAuthCode: string): Promise<AxiosResponse> =>
      axiosInstance.post('/auth/getRefreshToken', {code: serverAuthCode}),
    {
      onSuccess: async data => {
        const tokenResult = data.data.data;

        await storeUserSession(
          'idToken',
          `${tokenResult.token_type} ${tokenResult.id_token}`,
        );
      },

      onError: error => {
        console.log('에러?');
        console.log(error);
      },
    },
  );

  return {
    useGetRefreshTokenMutation,
  };
};

// export const getRefreshToken = async (serverAuthCode: string) => {
//   try {
//     const response = await axiosInstance.post('/auth/getRefreshToken', {
//       code: serverAuthCode,
//     });

//     const refreshToken = response.data.data;
//     console.log('refreshToken--->>', refreshToken);

//     // If you want to do something with the refreshToken, you can do it here.
//     // Example: await storeUserSession('token', `Bearer ${userInfo.idToken}`);

//     return refreshToken;
//   } catch (error) {
//     console.error('Error fetching refresh token:', error);
//     throw error; // You can handle the error as needed
//   }
// };
