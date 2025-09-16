"use client";
import React, { useState } from "react";
import { Button} from "react-bootstrap";
import { CiUser } from "react-icons/ci";

import { useRouter } from "next/navigation";



const UserMenuAuth = ({ session }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { firstName, role } = session.user;
  

  const handleNavigate = (link) => {
    setShow(false);
    router.push(link);
  };
 
  return (
    <>

      <Button onClick={handleShow} className="btn text-color1">
        <CiUser className="fs-6" /> {firstName}
      </Button>

    
    </>
  );
};

export default UserMenuAuth;
