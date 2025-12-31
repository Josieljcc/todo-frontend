export function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Login</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2" />
                <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Login</button>
            </form>
        </div>
    )
}