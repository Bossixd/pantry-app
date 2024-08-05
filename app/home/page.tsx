"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Box,
    Stack,
    Typography,
    Button,
    ButtonGroup,
    Modal,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    InputAdornment,
} from "@mui/material";

import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";

import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
    where,
    addDoc,
    Firestore,
} from "firebase/firestore";
import { db } from "@/firebase";

import "@fontsource/poppins/500.css";

import { getSession } from "@/app/helpers/auth_functions";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface PantryItem {
    uuid: string;
    name: string;
    count: number;
    cost: number;
}

interface JWTPayload {
    username: string;
}

export default function Home() {
    // Variable Handlers
    const [pantry, setPantry] = useState<PantryItem[]>([
        // { name: "Watermelon", cost: 1, count: 1 }
    ]);
    const [newItemName, setNewItemName] = useState<string>("");
    const [newItemCount, setNewItemCount] = useState<number>(0);
    const [newItemCost, setNewItemCost] = useState<number>(0);

    const [editItemCost, setEditItemCost] = useState<number>(0);
    const [editItemCount, setEditItemCount] = useState<number>(0);
    const [editItemName, setEditItemName] = useState<string>("");
    const [editItemUuid, setEditItemUuid] = useState<string>("");

    // Modal Handler
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // Update Items from Firebase
    const updateInventory = async () => {
        const payload: any = await getSession();
        const snapshot = query(
            collection(db, "items"),
            where("owner", "==", payload.user.username)
        );
        const docs = await getDocs(snapshot);
        const pantryList: PantryItem[] = [];
        docs.forEach((doc) => {
            pantryList.push({
                uuid: doc.id,
                name: doc.get("name"),
                count: doc.get("count"),
                cost: doc.get("cost"),
            });
        });
        setPantry(pantryList);
    };

    useEffect(() => {
        updateInventory();
    }, []);

    // Add Items to Firebase
    const addInventory = async (item: string, count: number, cost: number) => {
        const docRef = doc(db, "items", item);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Already Exists!");
        } else {
            const payload: any = await getSession();
            await addDoc(collection(db, "items"), {
                name: item,
                owner: payload.user.username,
                count: count,
                cost: cost,
            });
        }
    };

    // Delete Item from Firebase
    const deleteInventory = (item: string) => {
        const docRef = doc(db, "items", item);
        deleteDoc(docRef);
    };

    // Edit count of item in Firebase
    const editInventory = async (
        uuid: string,
        item: string,
        count: number,
        cost: number
    ) => {
        const docRef = doc(db, "items", uuid);
        console.log(uuid);
        const payload: any = await getSession();

        await setDoc(docRef, {
            name: item,
            owner: payload.user.username,
            count: count,
            cost: cost,
        });
    };

    return (
        <Box
            width={"100vw"}
            height={"93vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={2}
            style={{
                background:
                    "linear-gradient(225deg, rgba(255,65,228,1) 0%, rgba(0,232,255,1) 100%)",
            }}
        >
            <Box
                width={"98vw"}
                height={"90vh"}
                borderRadius={"15px"}
                bgcolor={"white"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography
                        width={"100%"}
                        fontFamily={"Poppins"}
                        fontSize={32}
                        color={"#333"}
                        textAlign={"left"}
                        ml={2}
                        mt={1}
                        mb={1}
                    >
                        Pantry Items
                    </Typography>
                    <Box mr={2}>
                        <Button variant="contained" onClick={handleOpenAdd}>
                            Add
                        </Button>
                    </Box>
                </Box>
                {/* ------------------ Table ------------------ */}
                <TableContainer
                    // component={Paper}
                    sx={{
                        width: "97%",
                        backgroundColor: "lightgrey",
                        borderRadius: "10px",
                    }}
                >
                    <Table aria-label="simple table">
                        {/* ------------------ Table Header ------------------ */}
                        <TableHead sx={{ bgcolor: "#0bd9ed" }}>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">
                                    Cost per Item&nbsp;($)
                                </TableCell>
                                <TableCell align="right">
                                    Total Cost&nbsp;($)
                                </TableCell>
                                <TableCell align="right">
                                    Action&nbsp;
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* ------------------ Table Body ------------------ */}
                        <TableBody>
                            {pantry.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name[0].toUpperCase() +
                                            row.name.slice(1).toLowerCase()}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.count}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.cost}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.count * row.cost}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup variant="contained">
                                            <Button
                                                onClick={() => {
                                                    setEditItemUuid(row.uuid);
                                                    setEditItemCost(row.cost);
                                                    setEditItemCount(row.count);
                                                    setEditItemName(row.name);
                                                    handleOpenEdit();
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    deleteInventory(row.uuid);
                                                    updateInventory();
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* ----------------- Modals ----------------- */}
            {/* ------------------ Add ------------------ */}
            <Modal open={openAdd} onClose={handleCloseAdd}>
                <Box
                    sx={style}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    gap={2}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add Item
                    </Typography>
                    <TextField
                        label="Item"
                        variant="outlined"
                        fullWidth
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                    <TextField
                        label="Count"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={newItemCount}
                        onChange={(e) =>
                            setNewItemCount(Number(e.target.value))
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    items
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack width={"100%"} direction={"row"} gap={2}>
                        <TextField
                            label="Cost"
                            variant="outlined"
                            type="number"
                            inputProps={{
                                step: 0.01,
                            }}
                            fullWidth
                            value={newItemCost}
                            onChange={(e) =>
                                setNewItemCost(Number(e.target.value))
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        per item
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant={"contained"}
                            onClick={async () => {
                                await addInventory(
                                    newItemName,
                                    newItemCount,
                                    newItemCost
                                );
                                setNewItemName("");
                                setNewItemCost(0);
                                setNewItemCount(0);
                                updateInventory();
                                handleCloseAdd();
                            }}
                        >
                            Add
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            {/* ------------------ Edit ------------------ */}
            <Modal open={openEdit} onClose={handleCloseEdit}>
                <Box
                    sx={style}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    borderRadius={2}
                    gap={2}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit Item : {editItemName}
                    </Typography>
                    <ButtonGroup variant="contained">
                        <Button
                            onClick={() => {
                                if (editItemCount - 10 >= 1) {
                                    setEditItemCount(editItemCount - 10);
                                }
                            }}
                        >
                            -10
                        </Button>
                        <Button
                            onClick={() => {
                                if (editItemCount - 1 >= 1) {
                                    setEditItemCount(editItemCount - 1);
                                }
                            }}
                        >
                            -1
                        </Button>
                        <TextField
                            label="Count"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={editItemCount}
                            onChange={(e) =>
                                setEditItemCount(Number(e.target.value))
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        items
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            onClick={() => setEditItemCount(editItemCount + 1)}
                        >
                            +1
                        </Button>
                        <Button
                            onClick={() => setEditItemCount(editItemCount + 10)}
                        >
                            +10
                        </Button>
                    </ButtonGroup>
                    <Button
                        variant={"contained"}
                        onClick={async () => {
                            console.log("E1");
                            console.log(editItemUuid);
                            await editInventory(
                                editItemUuid,
                                editItemName,
                                editItemCount,
                                editItemCost
                            );
                            console.log("E2");
                            updateInventory();
                            handleCloseEdit();
                        }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
