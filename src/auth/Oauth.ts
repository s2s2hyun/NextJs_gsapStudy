// 카카오
const CLIENT_ID = "90b7e82ac361d3790d5b21bd56ea025f";
const REDIRECT_URI = "http://localhost:8080/auth/callback/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// 네이버
const NAVER_CLIENT_ID = "az1qilLU9FU79o0mozHo";
const NAVER_REDIRECT_URI = "http://localhost:8080/auth/callback/naver";
const RANDOM_STATE = "RANDOM_STATE"; // Replace with your own state value or a function to generate one
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  NAVER_REDIRECT_URI
)}&state=${RANDOM_STATE}`;

// 구글

const GOOGLE_CLIENT_ID =
  "999264323170-pg894hi56bdfl4njvbcnlqdv4osjn2jq.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:8080/auth/callback/google";
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&scope=profile email&redirect_uri=${encodeURIComponent(
  GOOGLE_REDIRECT_URI
)}&state=RANDOM_STATE`;
