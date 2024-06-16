import { GoogleGenerativeAI } from "@google/generative-ai";
import * as THREE from 'three';

const textInputElement = document.getElementById("textInputElement");
const codeOutputElement = document.getElementById("codeOutputElement");
const apiSelectionElement = document.getElementById("apiSelectionElement");
const API_KEY = process.env.GEMINI_API_KEY;

let generatedCode;
let USER_SELECTED_API;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

window.generateScene = async function(){
  if(apiSelectionElement.value == 1){
    USER_SELECTED_API = "HTML Canvas";
  }else{
    USER_SELECTED_API = "ThreeJS";
  }
  const userPrompt = textInputElement.value;
  const generatedOutput = await model.generateContent(`
  This Is A New Scene Request:
  
  Requested Scene: `+userPrompt+`.
  
  NOTE: You have to use an existing canvas element with id named "sceneCanvas". The output should only be the code in plain text so no code formatting no code blocks no html script tags only the code in plain text. Don't cross "Device Specs" limits. If the "Requested Scene" is too complicated still try to make it similar to it using the specified API. Your token limit is 8,192 tokens so make sure to complete your code before you reach the limit. Minimize and Optimize the code. Remember not to use the string "sceneCanvas" to name any variables. There is no use of textures use colors and if needed use more mesh to make the model look more realistic.
  
  API:`+USER_SELECTED_API+`
  
  Device Specs: Android 11, Ram 4GB, SD665 and Adreno 610.
  `);
  const generatedResponse = await generatedOutput.response;
  generatedCode = generatedResponse.text();
  codeOutputElement.value = generatedCode;
  eval(generatedCode);
}