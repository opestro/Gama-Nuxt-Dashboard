import { createRouter, defineEventHandler, useBase } from "h3";
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "../../lib/firebase";
import { setCookie } from "h3";
const router = createRouter();

router.get(
  "/test",
  defineEventHandler(() => "Hello World test")
);
router.get(
  "/userAuth",
  defineEventHandler(() => {
    console.log("1");
    onAuthStateChanged(auth, (user) => {
      console.log("user");
      console.log(user);
      if (user) {
        return user;
        // User is signed in.
      } else {
        console.log("3");
        // No user is signed in.
        return "null";
      }
    });
    console.log("2");
  })
);
router.post(
  "/signIn",
  defineEventHandler(async(event) => {
    console.log("event");

    const query = getQuery(event) || {};
    let userQuery = {};
    if (query.userData) {
      userQuery = JSON.parse(query.userData);
    }

    console.log(userQuery || 0);
    let userCredential = [];
    //   /*

    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        userQuery.email,
        userQuery.password
      ).catch((error) => {
        console.log("error");
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });

      userCredential = userData.user;
      const userProfile = {
        uid: userCredential.uid,
        email: userCredential.email,
        emailVerified: userCredential.emailVerified,
        isAnonymous: userCredential.isAnonymous,
      };
      console.log("userCredential");
      console.log(userCredential);
      const cookies = userCredential.stsTokenManager.accessToken;
      setCookie(event, "session", cookies);
      return { userProfile, cookie: cookies };
    } catch (e) {
      return {
        hello: "world",
      };
      console.log(e);
    }
  })
);
router.post(
  "/signUp",
  defineEventHandler(() => "Hello World 1")
);
router.post(
  "/signOut",
  defineEventHandler(() => "Hello World 1")
);
router.post(
  "/forgetPassword",
  defineEventHandler(() => "Hello World 1")
);
export default useBase("/api/auth", router.handler);
