

export function getOAuthProvider(id:any,email:any) {
    
    if (!id || email) {
        return null;
    }
  
  
    if (typeof id === "string" && id.match(/^\d+$/)) {
      // 카카오 로그인
      return "kakao";
    } else if (email && email.endsWith("@gmail.com")) {
      // 구글 로그인
      return "google";
    } else if (email && email.endsWith("@naver.com")) {
      // 네이버 로그인
      return "naver";
    }
  
    return null;
  }