// pages/index.js

'use client';
import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from "@clerk/nextjs";

const DynamicAppWithNoSSR = dynamic(() => import("../../components/Chat"), {
  ssr: false,
  loading: () => <p>...</p>
});

export default function Home() {
    const { isLoaded, isSignedIn, user } = useUser();
    let email = '';
    let jhed_id = '';

    if (user && user.primaryEmailAddress) {
        email = user.primaryEmailAddress.toString();
        const atIndex = email.indexOf('@');
        if (atIndex !== -1 && email.endsWith('@jhu.edu')) {
            jhed_id = email.substring(0, atIndex);
            console.log(jhed_id);
        } else {
            console.log('Invalid email format');
        }
    } else {
        console.log('Email address not available');
    }

  return (
    <>
      <Head>
        <title>UIKit with NextJS 13</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      {/* <main className={styles.main}> */}
        <DynamicAppWithNoSSR userId={jhed_id}/>
      </main>
    </>
  )
}