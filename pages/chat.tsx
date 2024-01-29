import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SdkChat = dynamic(() => import("../components/SdkChat"), {
  ssr: false,
});

export default function SdkBasedChat() {
  let [libraryImported, setLibraryImported] = useState(false);

  useEffect(() => {
    // check if window exists
    console.log("@@@@@ WINDOW", window);
    if (typeof window !== "undefined") {
      window.CometChat = require("@cometchat/chat-sdk-javascript").CometChat;
      setLibraryImported(true);
    }
  }, []);

  return libraryImported ? <SdkChat /> : <p>Loading....</p>;
}
