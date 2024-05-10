![title](https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/2ac6f5e2-e17c-41f1-4696-b7827440f900/public)   

![title](https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/e8bfb108-4105-4da1-2bb6-64a319088600/public)   




useformstate , zod

Nodemailer , Redis(캐시) , 

lodash 디바운스 유틸 라이브러리 서버요청회수 감소 


sdfsdf


메인 페이지 (  )

수익 상세 페이지 

지출 상세페이지

날자별 수익/지출 통합 페이지 + 간단하게 추가 (바텀업 시트)





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




