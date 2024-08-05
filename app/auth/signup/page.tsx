"use client";

import {
    Box,
    Button,
    Typography,
    TextField,
    Link,
    InputAdornment,
} from "@mui/material";

import { useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

import InputField from "../auth_components/input_field";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import encrypt from "@/app/helpers/encrypt";
import navigate from "@/app/helpers/navigate";
import checkEmail from "@/app/helpers/email_check";

import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
    addDoc,
    Firestore,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Login() {
    // Variable Handlers
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [usernameExists, setUsernameExists] = useState<string>("");
    const [incorrectEmail, setIncorrectEmail] = useState<string>("");

    // Add User to Firebase
    // Add Items to Firebase
    const addInventory = async (
        username: string,
        email: string,
        password: string
    ) => {
        const docRef = doc(db, "users", username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Username Exists");
            setUsernameExists("Username Already Exists!");
            return false;
        }

        console.log("Email Check");
        console.log(await checkEmail(email));
        if (!(await checkEmail(email))) {
            console.log("Email invalid");
            setIncorrectEmail("Email is Invalid!");
            return false;
        }

        const encryptedPassword = await encrypt(password);

        await setDoc(docRef, { email: email, password: encryptedPassword });
        return true;
    };

    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            style={{
                background:
                    "linear-gradient(225deg, rgba(255,65,228,1) 0%, rgba(0,232,255,1) 100%)",
            }}
        >
            <Box
                width={"60vw"}
                height={"90vh"}
                maxWidth={"500px"}
                bgcolor={"white"}
                borderRadius={"10px"}
            >
                <Box>
                    <Typography
                        textAlign={"center"}
                        alignSelf={"center"}
                        height={"4.4rem"}
                        marginTop={"3.2rem"}
                        marginBottom={"1.8rem"}
                        fontSize={"2.6rem"}
                        fontWeight={700}
                        fontFamily={"Poppins"}
                    >
                        Sign Up
                    </Typography>
                </Box>
                <Box
                    margin={"auto"}
                    display={"flex"}
                    flexDirection={"column"}
                    width={"80%"}
                >
                    <Box>{usernameExists}</Box>
                    <InputField
                        name="Username"
                        placeholder="Type your Username"
                        icon={<PersonIcon />}
                        value={username}
                        callback={setUsername}
                    />
                    <Box>{incorrectEmail}</Box>
                    <InputField
                        name="Email"
                        placeholder="Type your Email"
                        icon={<EmailIcon />}
                        value={email}
                        callback={setEmail}
                    />
                    <InputField
                        name="Password"
                        placeholder="Type your Password"
                        icon={<LockIcon />}
                        value={password}
                        callback={setPassword}
                        password={true}
                    />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    marginTop={"50px"}
                >
                    <Button
                        sx={{
                            background:
                                "linear-gradient(270deg, rgba(255,65,228,1) 0%, rgba(0,232,255,1) 100%)",
                            borderRadius: 100,
                            width: "80%",
                            height: 50,
                        }}
                        variant={"outlined"}
                        onClick={async () => {
                            console.log("Button Pressed");
                            if (await addInventory(username, email, password))
                                navigate("/auth/login");
                        }}
                    >
                        <Typography
                            color={"white"}
                            fontWeight={500}
                            fontFamily={"Poppins"}
                        >
                            Sign Up
                        </Typography>
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginBottom={0}
                    paddingTop={"15%"}
                >
                    <Typography
                        color={"gray"}
                        fontWeight={300}
                        fontFamily={"Poppins"}
                    >
                        Already have an account?
                    </Typography>
                    <Link
                        mt={1}
                        href="/auth/login"
                        underline="none"
                        color="grey"
                    >
                        LOGIN
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
// font-size: 1.625rem;
// font-family: "General Sans", -apple-system,
