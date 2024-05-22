![title](https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/2ac6f5e2-e17c-41f1-4696-b7827440f900/public)   

![title](https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/e8bfb108-4105-4da1-2bb6-64a319088600/public)   


![title](https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/4cfb39cb-e349-492a-4695-f87049167200/public)



useformstate , zod

Nodemailer , Redis(캐시) , 



-- 프론트 최적화 -- 

lodash 디바운스 유틸 라이브러리 서버 요청회수 감소 


-- 미들 웨어 -- 


-- 데이터 최적화 --
리액트 쿼리 대신 fetch next.js 에서 지원하는 캐시를 
활용하여 서비비용과 데이터를 효율적으로 가져옴 
사용자의 월별 통계 데이터를 rest api 로 가져온다고할때
사용자가 매번 페이지를 방문할때마다 
불러오는 데이터가 생각보다 많기 때문에
fetch 함수에 캐시 태그를 달아서 사용자가 데이터를 생성/수정/삭제
할때만 해당 태그를 활성화 하여서 데이터를 불러오도록함
결론 -  
페이지를 들락일때마다 가져오는 데이터를
사용자가 생성/수정/삭제 를 통해서만 
데이터가 갱신 되도록하여 서버비용 감소




원인
"[objet Object]"는 JavaScript에서 일반적으로 발생하는 오류 메시지다. 이 오류는 일반적으로 코드 내에서 객체를 문자열로 변환하려고 할 때 발생한다.
let obj = { name: "John", age: 30 };
console.log("My name is " + obj);
해결
이 오류를 해결하려면, 코드에서 객체를 문자열로 변환하기 전에 명시적으로 객체의 속성에 액세스하거나 객체를 JSON 문자열로 변환해야 한다. 예를 들어, 위의 코드를 다음과 같이 수정할 수 있다.
let obj = { name: "John", age: 30 };
console.log("My name is " + obj.name);
또는 다음과 같이 객체를 JSON 문자열로 변환할 수 있다.
let obj = { name: "John", age: 30 };
console.log("My name is " + JSON.stringify(obj));
이렇게 하면 객체를 문자열로 변환할 때 "[objet Object]" 오류가 발생하지 않는다.



서버와 클라이언트간의 HTML 불일치로 생긴 오류 ( hydration )
리액트 캘린더 라이브러리가 영문에서 한글로 번역할때 생기는문제 
해결방법 캘린더의 props 중에서 locale = 'ko' 로 설정해서 해결 





헤더의 유저정보 표시 
페이지 새로고침시 또는 이동시 깜박임 현상 발견 
getServersession 을 layout에 선언하여 
서버에서 받아온 세션을 헤더에 props 넘겨주어
클라이언트와 세션 병합을 해서 깜박임 해결 





--- 참조 사이트 
메인페이지 스크롤 이벤트
https://www.freecodecamp.org/news/create-scroll-animations-with-framer-motion-and-react/

Next.js 공식문서 


