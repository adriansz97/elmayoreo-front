import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogin } from "../../store/auth/authThunks";

export const LoginPage = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(startLogin(username, password, navigate));
	}


  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full h-full text-gray-600">
					
					
					<h1 className="text-gray-800 text-2xl font-bold sm:text-3xl pt-10 pb-10 text-center">
						Tienda Ferretera el Mayoreo
					</h1>

					{/* Formulario login */}
					<div className="border-2 border-indigo-200 rounded-lg pb-10 px-10"> 

						<img src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg" 
						width={150} className="mx-auto rounded-full pt-4" />

						<form onSubmit={ handleSubmit } className="mt-8 space-y-5">
							<div>
								<label className="font-medium">Email</label>
								<input
									value={username}
									onChange={(e)=>setUsername(e.target.value)}
									type="username"
									required
									className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-400 focus:border-indigo-600 shadow-sm rounded-lg"
								/>
							</div>
							<div>
								<label className="font-medium">Password</label>
								<input
									value={password}
									onChange={(e)=>setPassword(e.target.value)}
									type="password"
									required
									className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-400 focus:border-indigo-600 shadow-sm rounded-lg"
								/>
							</div>
							<button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
								Iniciar sesión
							</button>
						</form>

					</div>


      </div>
    </main>
  );
};
