import { Route, Routes } from "react-router";
import { Login } from "../modules/auth/pages/login/login.tsx";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    )
}