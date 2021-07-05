import pathsConstants from '../constants/pathsConstants';

const {
  BASIC_URL,
  LOGIN,
} = pathsConstants;

interface LoginResponse {
  token: string;
  uid: string;
  username: string;
}

// eslint-disable-next-line import/prefer-default-export
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(BASIC_URL + LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new Error(data.message);
};
