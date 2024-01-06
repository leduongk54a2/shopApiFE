import React from "react";
import { Typography } from "antd";

function UserFooter() {
  return (
    <div className="appFooter -mx-5">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms & Conditions
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel:+123456789" target={"_blank"}>
        +123456789
      </Typography.Link>
    </div>
  );
}
export default UserFooter;
