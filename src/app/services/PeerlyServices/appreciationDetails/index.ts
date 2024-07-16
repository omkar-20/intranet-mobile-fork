import {
  POST_REWARD_ROUTE,
  POST_OBJECTION_ROUTE,
} from '../../../constant/apiRoutes';
import {apiCall} from '../index';
import {
  PostRewardRequest,
  PostRewardRequestBody,
  PostRewaredResponse,
  PostObjectionRequest,
  PostObjectionResponse,
} from './types';

export const postReward = async (payload: PostRewardRequest) => {
  const {body, params} = payload;
  const response = await apiCall<PostRewardRequestBody, PostRewaredResponse>({
    method: 'POST',
    url: `${POST_REWARD_ROUTE}/${params.id}`,
    data: body,
  });
  return response.data;
};

export const postObjection = async (payload: PostObjectionRequest) => {
  const response = await apiCall<PostObjectionRequest, PostObjectionResponse>({
    method: 'POST',
    url: POST_OBJECTION_ROUTE,
    data: payload,
  });
  return response.data;
};
