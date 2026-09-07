import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isSuspended) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userToken");
      navigate("/login", { replace: true });
    }
  }, [navigate, user?.isSuspended]);

  if (!user || user.isSuspended) return null;
  return <Outlet />;
};

export default PrivateRoutes;
