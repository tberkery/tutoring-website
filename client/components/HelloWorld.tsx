// necessary if using react hooks like useState
"use client";
import React, { FC, useState } from "react";

const HelloWorld : FC = () => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");

  return (
		<div className="flex justify-center items-center flex-col space-y-4 mt-4">
			<input
				className="
					text-xl max-w-60 px-1 border-2 border-black rounded-lg"
				type="text"
				value={ inputText }
				onChange={ (event) => setInputText(event.target.value) }
				placeholder="Hello World!"
			/>
			<button 
				className="
					text-lg px-2 rounded-md bg-sky-300 border-black border-2
					hover:bg-sky-600 hover:text-white active:bg-sky-900"
				onClick={ () => setOutputText(inputText) }
			>
				Echo
			</button>
			<h1 className="text-4xl">{ outputText }</h1>
		</div>
	);
}

export default HelloWorld;