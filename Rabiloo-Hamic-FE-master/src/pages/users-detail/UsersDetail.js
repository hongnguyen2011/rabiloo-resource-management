import React from "react";
import { useParams } from "react-router-dom";

function UsersDetail() {
  const param = useParams();
  console.log("fwq", param);
  return <div>ID: {param.id}</div>;
}

export default UsersDetail;
