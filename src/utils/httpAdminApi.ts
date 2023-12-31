// 封装API请求
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserInfoStore } from "../store/user";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const userInfoStore = useUserInfoStore();
const { token, refreshToken } = storeToRefs(userInfoStore);
// 创建实例对象
const instance = axios.create({
  baseURL: "/adminapi",
  timeout: 20000,
});
instance.interceptors.request.use(
  function (config) {
    if (token && token !== null) {
      // config.headers.Authorization = "Bearer " + token.value;
      config.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

instance.interceptors.response.use(
  function (response: any) {
    if (response.data && response.data.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        return toRefreshToken()
          .then((res: any) => {
            const resRefresh = res.data;
            if (resRefresh.code === 200 || resRefresh.code === 202) {
              console.log("Bearer " + resRefresh.data.accessToken.token);
              userInfoStore.changeToken(resRefresh.data.accessToken.token);
              userInfoStore.changeRefreshToken(
                resRefresh.data.refreshToken.token
              );
              // 更新 token 后重新发起之前失败的请求
              const config = response.config;
              config.headers.Authorization =
                "Bearer " + resRefresh.data.accessToken.token;
              return instance.request(config);
            } else {
              if (userInfoStore.isLogin) {
                ElMessage({
                  message: "Token expired, please log in again!",
                  grouping: true,
                  type: "error",
                });
                userInfoStore.clearToken();
              }
            }
          })
          .catch((err: any) => {
            if (err.response) {
              const error = err.response.data.error;
              if (error.code === 0) {
                ElMessage.error(error.details[0].issue);
              } else {
                if (userInfoStore.isLogin) {
                  ElMessage({
                    message: "Token expired, please log in again!",
                    grouping: true,
                    type: "error",
                  });
                  userInfoStore.clearToken();
                }
              }
              return;
            }
            if (userInfoStore.isLogin) {
              ElMessage({
                message: "Token expired, please log in again!",
                grouping: true,
                type: "error",
              });
              userInfoStore.clearToken();
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      // userInfoStore.clearToken();
    }
    return response;
  },
  function (error) {
    let status = error?.response?.status;
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const config = error.config;
        return toRefreshToken()
          .then((res: any) => {
            const resRefresh = res.data;
            if (resRefresh.code === 200 || resRefresh.code === 202) {
              console.log("Bearer " + resRefresh.data.accessToken.token);
              userInfoStore.changeToken(resRefresh.data.accessToken.token);
              userInfoStore.changeRefreshToken(
                resRefresh.data.refreshToken.token
              );
              // 更新 token 后重新发起之前失败的请求
              config.headers.Authorization =
                "Bearer " + resRefresh.data.accessToken.token;
              return instance.request(config);
            } else {
              if (userInfoStore.isLogin) {
                ElMessage({
                  message: "Token expired, please log in again!",
                  grouping: true,
                  type: "error",
                });
                userInfoStore.clearToken();
              }
            }
          })
          .catch((err: any) => {
            if (err.response) {
              const error = err.response.data.error;
              if (error.code === 0) {
                ElMessage({
                  message: error.details[0].issue,
                  grouping: true,
                  type: "error",
                });
              } else {
                if (userInfoStore.isLogin) {
                  ElMessage({
                    message: "Token expired, please log in again!",
                    grouping: true,
                    type: "error",
                  });
                  userInfoStore.clearToken();
                }
              }
              return;
            }
            if (userInfoStore.isLogin) {
              ElMessage({
                message: "Token expired, please log in again!",
                grouping: true,
                type: "error",
              });
              userInfoStore.clearToken();
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    }
    return Promise.reject(error);
  }
);

const http = {
  get<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.get<T>(url, {
      params: data,
      ...config,
    });
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post<T>(url, data, config);
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.put<T>(url, data, config);
  },
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.patch<T>(url, data, config);
  },
  delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.delete<T>(url, {
      data,
      ...config,
    });
  },
};

export default http;

async function toRefreshToken() {
  const config = {
    headers: {
      Authorization: "Bearer " + token.value,
    },
  };
  try {
    const response = await axios.post("/api/v2/my/refresh", {
      refreshToken: "Bearer " + refreshToken.value,
    });
    if (response?.status === 200 && response?.statusText === "OK") {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
