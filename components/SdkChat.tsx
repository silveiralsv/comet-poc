import React, { useEffect, useState } from "react";
import { CometChat, User } from "@cometchat/chat-sdk-javascript";
import {envConfig} from '../env.config'



export default function SdkChat() {
  const [loggedUser, setLoggedUser] = useState<User>();

  const init = async () => {
    let appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(envConfig.REGION)
      .autoEstablishSocketConnection(true)
      .build();

    await CometChat.init(envConfig.APP_ID, appSetting);
    CometChat.getLoggedinUser().then(
      (user) => {
        if (!user) {
          CometChat.login(envConfig.UID, envConfig.AUTH_KEY).then(
            (user) => {
              console.log("Login Successful:", { user });
              setLoggedUser(user);
            },
            (error) => {
              console.log("Login failed with exception:", { error });
            }
          );
        } else {
          setLoggedUser(user);
        }
      },
      (error) => {
        console.log("Some Error Occured", { error });
      }
    );
  };

  const getMessages = async () => {
    let limit = 30;
    let conversationType = "group";
    let conversationRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(limit)
      .setConversationType(conversationType)
      .build();
    console.log("@@@@@  -> file: SdkChat.tsx:51 -> conversationRequest:", conversationRequest)
    conversationRequest.fetchNext().then(
      (conversationList) => {
        console.log("Conversation list received:", conversationList);
      }
    );
      
  };

  useEffect(() => {
    void init();
  }, []);

  useEffect(() => {
    if(!loggedUser) return;
    void getMessages();
  }, [loggedUser]);

  return <div className="w-[100vw] h-[100vh] flex bg-gray-800 p-3"><div className="rounded-md self-end w-96 bg-black bg-opacity-55 h-full p-3">
    <div className="flex w-full  p-2 bg-slate-s900 bg-opacity-20 rounded-md">
      <div>
        Main Chat room
        </div>
    </div>
    </div></div>;
}
