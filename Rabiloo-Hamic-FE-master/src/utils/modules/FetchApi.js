import {useAppAccount} from '../../hooks';
import {Strings} from '../resources/strings';
import Cookies from 'universal-cookie';

const URL_API = process.env.REACT_APP_API;
// const API_ENDPOINT = 'https://rabiloo-hamic-be.herokuapp.com'; //dev
const API_ENDPOINT = 'http://192.168.43.211:8080'; //local

const CommonCall = async (api, header) => {
  const STRINGS = Strings[localStorage.getItem('lang')];
  try {
    const cookies = new Cookies();
    const account = cookies.get('account');
    let headers;
    // if (accessToken) {
    headers = {
      Authorization: `Bearer ${account.accessToken}`,
      'Content-Type': 'application/json',
      // Accept: "application/json",
      'Access-Control-Request-Headers': '*',
      'Access-Control-Allow-Origin': '*',
    };
    // } else {
    //   headers = {
    //     Accept: "application/json",
    //   };
    // }
    if (header && (header.method === 'POST' || header.method === 'PUT')) {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      };
    }
    let head = {
      ...header,
      headers,
    };
    console.log('head', head);
    const response = await fetch(api, {
      ...head,
      credentials: 'omit',
    });

    if (response.status === 500) {
      return {
        code: response.status,
        message: STRINGS.server_error,
        success: false,
      };
    }
    if (response.status === 200) {
      return await response.json();
    }
    //   if (response.status === 401) {
    //     //refresh token
    //     const resToken = await refreshToken();
    //     console.log("resToken", resToken);
    //     if (resToken.success) {
    //       const newHeaders = {
    //         ...headers,
    //         Authorization: `Bearer ${resToken.access_token}`,
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "Access-Control-Request-Headers": "*",
    //       };
    //       const newHead = {
    //         ...head,
    //         headers: newHeaders,
    //       };
    //       const responseRefeshToken = await fetch(api, newHead);
    //       const resultRefeshToken = await responseRefeshToken.json();
    //       return resultRefeshToken;
    //     } else {
    //       return {
    //         code: response.code,
    //         success: false,
    //       };
    //     }
    //   } else {
    //     const resJson = await response.json();
    //     return {
    //       code: resJson.status,
    //       message: resJson.message,
    //       success: false,
    //     };
    //   }
  } catch (error) {
    return {
      success: false,
      message: STRINGS.network_error,
    };
  }
};

const FetchApi = {
  getUsers: async size => {
    const header = {
      method: 'GET',
    };
    const api = `${URL_API}?results=${size}`;
    const result = await CommonCall(api, header);
    return result;
  },
  login: async obj => {
    const header = {
      method: 'POST',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/public/login`;
    const result = await CommonCall(api, header);
    return result;
  },
  allExam: async () => {
    const header = {
      method: 'GET',
    };
    const api = `${API_ENDPOINT}/api/admin/exam-all`;
    const result = await CommonCall(api, header);
    return result;
  },
  deleteExam: async ({id}) => {
    const header = {
      method: 'DELETE',
    };
    const api = `${API_ENDPOINT}/api/admin/exam/exam-delete?id=${id}`;
    const result = await CommonCall(api, header);
    return result;
  },
  createExam: async obj => {
    const header = {
      method: 'POST',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/admin/exam/exam-create`;
    const result = await CommonCall(api, header);
    return result;
  },
  editExam: async obj => {
    const header = {
      method: 'PUT',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/admin/exam/exam-edit`;
    const result = await CommonCall(api, header);
    return result;
  },
  createQuestion: async obj => {
    const header = {
      method: 'POST',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/admin/question/question-create/`;
    const result = await CommonCall(api, header);
    return result;
  },
  updateQuestion: async obj => {
    const header = {
      method: 'PUT',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/admin/question/question-edit`;
    const result = await CommonCall(api, header);
    return result;
  },
  deleteQuestion: async ({questionId}) => {
    const header = {
      method: 'DELETE',
    };
    const api = `${API_ENDPOINT}/api/admin/question/question-delete?id=${questionId}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getDetailExam: async ({examId}) => {
    const header = {
      method: 'GET',
    };
    const api = `${API_ENDPOINT}/api/admin/exam?id=${examId}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getDetailExamUser: async ({examId}) => {
    const header = {
      method: 'GET',
    };
    const api = `${API_ENDPOINT}/api/user/exam?id=${examId}`;
    const result = await CommonCall(api, header);
    return result;
  },
  getAllUserExam: async () => {
    const header = {
      method: 'GET',
    };
    const api = `${API_ENDPOINT}/api/user/exam-all`;
    const result = await CommonCall(api, header);
    return result;
  },
  userStartExam: async obj => {
    const header = {
      method: 'POST',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/public/exam-start`;
    const result = await CommonCall(api, header);
    return result;
  },
  userSubmitExam: async obj => {
    const header = {
      method: 'PUT',
      body: JSON.stringify(obj),
    };
    const api = `${API_ENDPOINT}/api/public/exam-submit`;
    const result = await CommonCall(api, header);
    return result;
  },
};

export {FetchApi};
