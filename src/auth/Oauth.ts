const CLIENT_ID = "90b7e82ac361d3790d5b21bd56ea025f";
const REDIRECT_URI = "http://localhost:8080/auth/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
