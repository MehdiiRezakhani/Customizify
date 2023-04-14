import Head from 'next/head';
import Canvas from '../canvas';
import Customizer from '../components/main/Customizer';
import Home from '../components/main/Home';
import { AddToHomeScreen } from 'react-pwa-add-to-homescreen';


function App() {
  return (
    <main className="app transition-all ease-in">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/HLogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Healitia</title>
        <meta name="keywords" content="Healitia, Customizify, T-shirt, AI, Customize, 3D, ThreeJS, NextJS, ReactJS, TypeScript"/>
        <meta name="description" content="Unleash your imagination and define your own style. Developed by Mehdi Rezakhani & Omid Afzali"/>
      </Head>
      <AddToHomeScreen/>
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App
