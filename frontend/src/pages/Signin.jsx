import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BoldSubHeading } from "../components/BoldSubHeading";
import { SmallHeading } from "../components/SmallHeading";
import { Button } from "../components/Button";
import { BottomText } from "../components/BottomText";
import { passwordAtom, usernameAtom } from "../store/atoms/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Signin(){
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);
    const navigate = useNavigate();
    return <>
    <BackgroundWrapper>
    <Heading label = "Sign in" />
    <SmallHeading label = "Enter your details to sign in to your account" />
    <BoldSubHeading label={"E-mail"} />
    <InputBox placeholder={"bhuvankaushal08112002@gmail.com"} setter = {setUsername}></InputBox>
    <BoldSubHeading label={"Password"} />
    <InputBox placeholder={"123456"} setter = {setPassword}></InputBox>
    <Button label = {"Sign in"} sendRequest = {()=>{
            axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            }, {
                headers: {
                'content-Type':'application/json'
            }
            }).then((res) => {
            console.log(res)
            if(res.data.token) {
                localStorage.setItem("Token", 'Bearer ' + res.data.token);
                navigate("../Dashboard")
            }
            })
    }}></Button>
    <BottomText label1 = {"Doesn't Have an Account?"} label2 = {"Sign up"} href = {"/Signup"}/>
    </BackgroundWrapper>
    </>
}