"use client";

import { useState } from "react";
import navigate from "@/app/helpers/navigate";
import encrypt from "@/app/helpers/encrypt";

import {
    Box,
    Button,
    Typography,
    TextField,
    Link,
    InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import InputField from "../auth_components/input_field";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import { redirect } from "next/navigation";

export default function Login() {
    // Variable Handlers
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

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
                        Login
                    </Typography>
                </Box>
                <Box
                    margin={"auto"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                    width={"80%"}
                >
                    <Box>{errorMessage}</Box>
                    <InputField
                        name="Username"
                        placeholder="Type your Username"
                        icon={<PersonIcon />}
                        value={username}
                        callback={setUsername}
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
                        onClick={async (formData) => {
                            await fetch("/api/auth/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    username: username,
                                    password: password,
                                }),
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    if (!res.success) {
                                        console.log("Not SUccess");
                                        setErrorMessage(res.reason);
                                        setPassword("");
                                    } else {
                                        navigate("/home");
                                    }
                                });
                        }}
                    >
                        <Typography
                            color={"white"}
                            fontWeight={500}
                            fontFamily={"Poppins"}
                        >
                            Login
                        </Typography>
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginBottom={0}
                    paddingTop={"33%"}
                >
                    <Typography
                        color={"gray"}
                        fontWeight={300}
                        fontFamily={"Poppins"}
                    >
                        Or Sign Up Using
                    </Typography>
                    <Link
                        mt={1}
                        href="/auth/signup"
                        underline="none"
                        color="grey"
                    >
                        SIGN UP
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
// font-size: 1.625rem;
// font-family: "General Sans", -apple-system,
