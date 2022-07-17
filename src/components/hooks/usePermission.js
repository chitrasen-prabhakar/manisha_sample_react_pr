import { useState, useEffect } from "react";

export default function usePermission() {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      let permissions = localStorage.getItem("ls.userPermissions");
      if (permissions) {
        permissions = JSON.parse(permissions);
        const permissionsArr = [];
        for (let permission in permissions) {
          permissions[permission].forEach(obj => {
            permissionsArr.push(obj.name);
          })
        }
        setPermissions(permissionsArr);
      }
    }
  }, []);

  return permissions;
}