"use client"
import  { checkPassword, checkVerificationCode, createAccount, isDuplicateEmail, sendVerificationCode}  from '@/app/api/signUp/action';
import React, { useEffect, useRef } from 'react'
import { debounce } from 'lodash';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { GrLinkNext } from "react-icons/gr";

interface InputProps {
    name : string ;
    type : string ;
    required ? : boolean ;
    onChange? : (e: React.ChangeEvent<HTMLInputElement>) => void
    errors ? : string [] | string ; 
    
}



function Input({errors,name , type, required, onChange}:InputProps) {
    return(
        <>
        <input onChange={onChange} required={required} maxLength={30} className='errors: focus:outline-none w-[100%] border-slate-100 border-2 border-b-black bg-slate-100 p-2' type={type} name={name} />
        {errors && <p className='text-[0.8rem] text-rose-500 absolute'>{errors}</p>}
        </>
    )
    
}

function SingUpFormSubmit() {
    const {pending} = useFormStatus();
    return (
        <>
        <button disabled={pending} type='submit' className={`${pending ? 'text-black text-[20px]' : 'text-black'  } mt-auto`}>

            {pending ? ". . ." : <GrLinkNext className='w-[50px] h-[50px]'/>}
        </button>
        </>
    )
}


function SignUpForm() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
      });


    const [passError ,setPassError] = useState("");    

    const [emailCheck , setEmailCheck] = useState(false);
    const [emailcodeCheck, setEmailCodeChecked] = useState(false);

    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  

    const [state,action] = useFormState(createAccount,null);

    const formRef = useRef<HTMLFormElement>(null);

  const handleSendVerificationCode = async () => {

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;
      const res = await isDuplicateEmail(email)
        
      if (res === "이메일 형식 오류") {
        console.log(email);
        alert('이메일 형식 오류');
        return
      }  

      if (res) {
        sendVerificationCode(email);
        setEmailCheck(true);
      }
      else {
        alert("이미 존재하는 이메일입니다.")
      }
    }
  };
  
  const handleCheckCode = async () => {
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        const email = formData.get('email') as string;
        const emailCode = formData.get('emailcheck')  
        const res = await checkVerificationCode(email, emailCode+"")
        if (res) {
            //formData.append('codecheck',"true");
            setEmailCodeChecked(true);
        } else {
            setEmailCodeChecked(false);
            //formData.append("codecheck","false");
        }
        console.log(formData.get('codecheck'));
  }

  }

  const handleConfirmPass = async () => {
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        const res = await checkPassword(formData);

        if (res?.fieldErrors.password) {
            const password = res.fieldErrors.password[0];
            setFormState((prevState) => ({ ...prevState, password }));
        } else {
            setFormState((e) => ({...e,password:""}))
        }

        if (res?.fieldErrors.passwordCheck) {
            setPassError(res.fieldErrors.passwordCheck+"");
        } else {
            setPassError("");
        }
    }
  }
  
  const debounceConfirmPass = debounce(handleConfirmPass,300)


  return (
    <form ref={formRef} action={action} className='p-4 flex flex-col items-center justify-center h-[70%] sm:w-[70%] w-[90%]' >
                <div className='m-4 w-[100%] '>
                    <div>이메일</div> 

                    <div className='relative'>
                    <Input errors={state?.fieldErrors.email} name='email' type='email' />
                        <button  onClick={()=>{handleSendVerificationCode()}} type='button' className='absolute bottom-3 w-[40px] right-0 bg-black rounded-lg text-white'>인증</button>

                    </div>

                </div>
                {
                    emailCheck && 
                    <div className='m-4 w-[100%] '>
                    <div>확인 코드</div> 
                    <input type="hidden" name="codecheck" value={emailcodeCheck+"" === "true" ? "true" : "false"} />  
                    <div className='relative'>
                    <Input name='emailcheck' type='number' />
                        <button type='button' disabled={emailcodeCheck} onClick={()=>{handleCheckCode()}} className={`${emailcodeCheck ? 'bg-slate-400' : 'bg-black'} absolute bottom-3 w-[40px] right-0 rounded-lg text-white`}>확인</button>
                    </div>
                </div>
                }
                <div className='m-4 w-[100%]'>
                    <div>비밀번호</div>
                    <Input  onChange={()=>{debounceConfirmPass()}} errors={state?.fieldErrors.password || formState.password} name='password' type='password' />
                </div>
                <div className='m-4 w-[100%] ' >
                    <div >비밀번호 확인</div>
                    <Input onChange={()=>{debounceConfirmPass()}} errors={state?.fieldErrors.passwordCheck} 
                     name='passwordCheck' type='password' />
                     {passError == "" ? <p></p> : <p className='text-rose-500'>{passError}</p>}
                </div>
                <div className='m-4 w-[100%] ' >
                    <div>닉네임</div>
                    <Input errors={state?.fieldErrors.nickname}  name='nickname' type='text' />
                </div>

              
                {/* <button disabled={pending} type='submit' className={`${pending && 'bg-black' } bg-blue-500 rounded-lg`}>
                    {pending ? "loading.." : "회원가입"}
                </button> */}

                <SingUpFormSubmit/>
                
                
            </form>
  );

}
export default SignUpForm;