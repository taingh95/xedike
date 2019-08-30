import React from "react";
import { Button } from "reactstrap";
import { ArrowRightAlt } from "@material-ui/icons";



function BecomeDriverSection() {
  return (
    <div
      style={{
        height: "500px",
        backgroundImage: "url('./images/driver.png')",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8
      }}
    >
      <p className="h1 text-white" style={{
          textShadow: "0.2px 0.2px 10px #000000"
      }}>Get ready to drive with us</p>
      <span className="h5 text-white my-2" style={{
          textShadow: "0.2px 0.2px 10px #000000"
      }}>
        Make money whenever you want, wherever you are.
      </span>

      <Button
        color="secondary shadow-lg mt-2"
        style={{ width: "20rem", height: "4rem", fontSize: "2rem" }}
      >
        Join With Us
        <ArrowRightAlt style={{fontSize: "3rem"}} />
      </Button>
    </div>
  );
}

export default BecomeDriverSection;
