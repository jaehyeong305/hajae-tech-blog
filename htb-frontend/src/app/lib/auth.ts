type UserInfo = {
    username: string,
    email: string,
}

export const saveAuthData = (response: Response, userInfo: UserInfo) => {
    // NOTE(hajae): 서버 응답에서 토큰 정보 가져오기
    const accessToken = response.headers.get('Access-Token');
    const refreshToken = response.headers.get('Refresh-Token');

    // NOTE(hajae): 로컬 스토리지에 토큰 저장
    localStorage.setItem('accessToken', accessToken || '');
    localStorage.setItem('refreshToken', refreshToken || '');
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export const getBaseUrl = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'http://jaehyeong.com';
        case 'development':
            return 'http://localhost:8080';
        default:
            return '';
    }
}