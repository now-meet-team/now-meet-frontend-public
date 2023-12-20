import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {useModalStore} from 'store/modal/modalStore';

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
export const useGoogleGetRefreshToken = () => {
  const useGetGoogleRefreshTokenMutation = useMutation(
    (serverAuthCode: string): Promise<AxiosResponse> =>
      axiosInstance.post('/auth/getRefreshToken/google', {
        code: serverAuthCode,
      }),
    {
      onSuccess: () => {},

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useGetGoogleRefreshTokenMutation,
  };
};
