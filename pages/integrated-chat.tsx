import React, { useEffect } from 'react'
import dynamic from "next/dynamic";


const CometChatNoSSR = dynamic(() => import("../CometChatNoSSR"), {
  ssr: false,
});

  const COMETCHAT_CONSTANTS = {
  APP_ID: "6d35d12afc71c71fd2497026f31df3c6ed074866", //Replace with your App ID
  REGION: "us", //Replace with your App Region
  AUTH_KEY: "da5974f7bdc1338ffd26f27f4c24ff7d57d30f21" //Replace with your Auth Key
  }


  export default function Chat() {
    useEffect(() => {
      window.CometChat = require("@cometchat/chat-sdk-javascript").CometChat;
    });
  
    return (
      <div>
        <CometChatNoSSR />
      </div>
    );
  }
