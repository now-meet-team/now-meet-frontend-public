import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';

/** 계정 삭제 회원가입  **/
export const usePushNotification = () => {
  const usePushNotificationMutation = useMutation(
    (item: {
      title: string;
      message: string;
      nickname: string;
    }): Promise<AxiosResponse> => axiosInstance.post('/firebase/push', item),
    {
      onSuccess: () => {},

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    usePushNotificationMutation,
  };
};