// components/Chat.jsx

'use client';

import SendbirdApp from '@sendbird/uikit-react/App';
import NavBar from './Navbar';
import { useUser } from "@clerk/nextjs";

const APP_ID = process.env.NEXT_PUBLIC_SEND_BIRD_APP_ID;

export default function Chat({ userId }) {
   return (
      <div style={{ height: "100vh", width: "100vw" }}>
         <SendbirdApp appId={APP_ID} userId={userId} />
      </div>
   );
}
