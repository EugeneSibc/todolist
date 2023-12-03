import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ReactDOM.render(
//   <>
//     <div><h1>Hello World</h1></div>
//     <div><h1>Hello World</h1></div>
//     <div><h1>Hello World</h1></div>
//   </>,
//   document.getElementById('root'))


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

   <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

/*The primary reason for the React 18 ReactDOM.render deprecation is usability.
As shown above, with createRoot we can manage multiple calls to render() with the 
same root and the same DOM container element, leading to less boilerplate code and 
a cleaner API.*/