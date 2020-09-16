import React, { useEffect, useState } from "react";
import Twite from "../components/Twite";
import { dbService, storageService } from "../firebase";

import TwiteFactory from "../components/TwiteFactory";

export default ({ userObj }) => {
  const [twites, setTwites] = useState([]);

  useEffect(() => {
    dbService.collection("twites").onSnapshot((snapshot) => {
      const twiteArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwites(twiteArray);
    });
  }, []);

  return (
    <div className="container">
      <TwiteFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {twites.map((twite) => (
          <Twite
            key={twite.id}
            twiteObj={twite}
            isOwner={twite.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
