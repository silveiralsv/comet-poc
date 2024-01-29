import { useEffect, useState } from "react";
import { CometChatConversationsWithMessages, CometChatUIKit,UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { User } from "@cometchat/chat-sdk-javascript";

const consts = {
  APP_ID: "251747a3c498176c", //Replace with your App ID
  REGION: "us", //Replace with your App Region
  AUTH_KEY: "da5974f7bdc1338ffd26f27f4c24ff7d57d30f21", //Replace with your Auth Key
};


function CometChatNoSSR() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(consts.APP_ID)
      .setRegion(consts.REGION)
      .setAuthKey(consts.AUTH_KEY)
      .build();


    CometChatUIKit.init(UIKitSettings)?.then(()=> {
      console.log("Initialization completed successfully");
      CometChatUIKit.getLoggedinUser().then((user) => {
       if (!user) {
         CometChatUIKit.login('superhero1')
           .then((user) => {
             console.log("Login Successful", { user });
             setUser(user);
           })
           .catch(console.error);
       } else {
         console.log("Already logged-in", { user });
         setUser(user);
       }
     }).catch(console.error);

    }) .catch((e) => {
      console.log(e);
    });

    // CometChatUIKit.init(UIKitSettings)
    //   .then(() => {
    //     console.log("Initialization completed successfully");
    //     CometChatUIKit.getLoggedinUser().then((user) => {
    //       if (!user) {
    //         CometChatUIKit.login("UID", consts.AUTH_KEY)
    //           .then((user) => {
    //             console.log("Login Successful", { user });
    //             setUser(user);
    //           })
    //           .catch((error) => {}, console.log);
    //       } else {
    //         console.log("Already logged-in", { user });
    //         setUser(user);
    //       }
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  return user ? (
    <div style={{ width: "95vw", height: "95vh" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <CometChatConversationsWithMessages />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default CometChatNoSSR;
