"use client"

import { signOut } from "next-auth/react";

export default function ButtonLogout() {

    const logout = async () => {
        await signOut();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <div onClick={logout}>Sair</div>
    );
}
