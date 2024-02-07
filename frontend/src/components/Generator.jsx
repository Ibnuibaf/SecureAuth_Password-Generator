import { useState } from "react";
import { SiProbot } from "react-icons/si";
import { FaRegCopy } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import SaverModal from "./SaverModal";
import toast from "react-hot-toast";
import api from "../axios/api";
function Generator() {
  const [passlength, setPasslength] = useState(4);
  const [strength, setStrength] = useState("easy");
  const [generatedPass, setGeneratedPass] = useState(null);
  const [requires, setRequires] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const generatePassword = () => {
    const characters = {
      letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+{}[]|:;<>,.?/~",
    };

    let charset = characters.letters;

    if (requires.numbers) {
      charset += characters.numbers;
    }
    if (requires.symbols) {
      charset += characters.symbols;
    }

    let password = "";
    for (let i = 0; i < passlength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedPass(password);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard");
  };
  return (
    <div className="grid grid-cols-2 rounded-2xl bg-med-bg/50 p-4 max-w-screen-md">
      {isOpen && <SaverModal />}
      <div className="bg-med-bg rounded-l-xl text-side-bar p-5">
        <div className="p-1">
          <p className="text-4xl font-mono ">Generate Password</p>
          <p className="text-sm">
            Unlock Your Security: Empowering You with Strong, Randomized
            Passwords for Ultimate Online Protection!
          </p>
        </div>
        <div className="flex justify-center text-green-500 px-4">
          <button
            className="flex gap-2 justify-center rounded-full bg-sec-bg-color w-full py-2 font-semibold text-2xl font-mono"
            onClick={generatePassword}
          >
            <SiProbot size={24} /> Generate
          </button>
        </div>
        <div className="pl-3 mt-3">
          <p className="flex items-center">
            <VscDebugBreakpointLogUnverified size={24} /> Customizable password
            length.
          </p>
          <p className="flex items-center">
            <VscDebugBreakpointLogUnverified size={24} />
            Variable strength levels.
          </p>
          <p className="flex items-center">
            <VscDebugBreakpointLogUnverified size={24} />
            Selectable character sets.
          </p>
          <p className="flex items-center">
            <VscDebugBreakpointLogUnverified size={24} />
            Instant display of generated passwords.
          </p>
          <p className="flex items-center">
            <VscDebugBreakpointLogUnverified size={24} />
            Copy generated passwords to clipboard with one click.
          </p>
        </div>
        <div className="mt-2 text-xs flex justify-center items-baseline">
          <p className="opacity-55">© 2024 SecureAuth. All rights reserved.</p>
        </div>
      </div>
      <div className="p-5">
        <div>
          <p>Password Length</p>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="4"
              max="18"
              value={passlength}
              onChange={(e) => setPasslength(e.target.value)}
              className="w-full cursor-pointer "
            />
            <p className="text-lg font-semibold">{passlength}</p>
          </div>
          <p className="text-xs opacity-90">Choose the length of password.</p>
        </div>
        <div>
          <p>Strength Level</p>
          <div className="flex items-center gap-3">
            <input
              type="range"
              value={
                strength == "easy"
                  ? 1
                  : strength == "medium"
                  ? 2
                  : strength == "hard"
                  ? 3
                  : ""
              }
              min={1}
              max={3}
              onChange={(e) => {
                e.target.value == 1
                  ? setStrength("easy")
                  : e.target.value == 2
                  ? setStrength("medium")
                  : e.target.value == 3
                  ? setStrength("hard")
                  : "";
              }}
              className="w-full cursor-pointer "
            />
            <p className="text-lg font-semibold">{strength.toUpperCase()}</p>
          </div>
          <p className="text-xs opacity-90">Choose the strength of password.</p>
        </div>
        <div>
          <p>Characters Add-On</p>
          <div className="grid grid-cols-3 ">
            <div>
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="customStyle"
                >
                  <input
                    type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-900/20 bg-green-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-green-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:bg-green-900 checked:before:bg-green-900 hover:scale-105 hover:before:opacity-0"
                    id="customStyle"
                    onChange={(e) =>
                      setRequires({ ...requires, letters: e.target.checked })
                    }
                  />
                  <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                Letters
              </div>
            </div>
            <div>
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="customStyle"
                >
                  <input
                    type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-900/20 bg-green-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-green-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:bg-green-900 checked:before:bg-green-900 hover:scale-105 hover:before:opacity-0"
                    onChange={(e) =>
                      setRequires({ ...requires, numbers: e.target.checked })
                    }
                    id="customStyle"
                  />
                  <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                Numbers
              </div>
            </div>
            <div>
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="customStyle"
                >
                  <input
                    type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-green-900/20 bg-green-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-green-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:bg-green-900 checked:before:bg-green-900 hover:scale-105 hover:before:opacity-0"
                    onChange={(e) =>
                      setRequires({ ...requires, symbols: e.target.checked })
                    }
                    id="customStyle"
                  />
                  <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                Symbols
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex justify-between items-center bg-med-bg text-side-bar px-4 py-1 text-xl gap-3 rounded font-semibold">
            <p className="text-side-bar/90">
              {generatedPass ? generatedPass : "Generate Password to Copy!"}
            </p>
            <FaRegCopy
              size={24}
              className="cursor-pointer"
              onClick={() => copyToClipboard(generatedPass)}
            />
          </div>
        </div>
        {generatedPass && (
          <div className="flex justify-center m-3 p-2 ">
            {/* <button className="flex gap-3 justify-center text-lg bg-side-bar px-6 py-1 w-full"><FaRegSave size={28} onClick={()=>setIsOpen(true)}/>  Save Password</button> */}
            <SaverModal generatedPass={generatedPass} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Generator;
