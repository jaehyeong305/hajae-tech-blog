type UserInfo = {
    username: string,
    email: string,
}

export const saveAuthData = (response: Response, userInfo: UserInfo) => {
    // 서버 응답에서 토큰 정보 가져오기
    const accessToken = response.headers.get('Access-Token');
    const refreshToken = response.headers.get('Refresh-Token');

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem('accessToken', accessToken || '');
    localStorage.setItem('refreshToken', refreshToken || '');
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}