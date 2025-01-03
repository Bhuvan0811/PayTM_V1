import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BoldSubHeading } from "../components/BoldSubHeading";
import { SmallHeading } from "../components/SmallHeading";
import { Button } from "../components/Button";
import { BottomText } from "../components/BottomText";
import { useRecoilState } from "recoil";
import { firstnameAtom, lastnameAtom, passwordAtom, usernameAtom } from "../store/atoms/atoms";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export function Signup(){
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);
    const [firstname, setFirstname] = useRecoilState(firstnameAtom);
    const [lastname, setLastname] = useRecoilState(lastnameAtom);
    const navigate = useNavigate();
    return <>
        <BackgroundWrapper>
        <Heading label = "Sign up" />
        <SmallHeading label = "Enter your Information to create an account" />
        <BoldSubHeading label={"E-mail"} />
        <InputBox placeholder={"bhuvankaushal08112002@gmail.com"} setter = {setUsername}></InputBox>
        <BoldSubHeading label={"Password"} />
        <InputBox placeholder={"123456"} setter = {setPassword}></InputBox>
        <BoldSubHeading label={"First Name"} />
        <InputBox placeholder={"Bhuvan"} setter = {setFirstname}></InputBox>
        <BoldSubHeading label={"Last Name"} />
        <InputBox placeholder={"Kaushal"} setter = {setLastname}></InputBox>
        <Button label = {"Sign up"} sendRequest = {()=>{
            axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstname,
                lastname,
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
            });
        }}></Button>
        <BottomText label1 = {"Already Have an Account?"} label2 = {"Sign in"} href = {"/Signin"}/>
        </BackgroundWrapper>
    </>
}