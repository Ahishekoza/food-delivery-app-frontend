import { Link, useLocation } from "react-router-dom";

const BreadCrums = () => {
  // useLocation gives me the pathname
  // convert the pathname to a array
  // render the array and specific path in the breadcrumbPath
  // check for the last element in the array which represents we are on that page
  // so that we can skip that element to be added to the breadcrumb
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x !== "");
  let breadcrumbPath = "";
  return (
    <div className="p-2">
      {pathnames.length > 0 && <Link className="hover:underline" to={"/"}>Home</Link>}
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;


        return isLast ? (
          <span key={breadcrumbPath}> / {name}</span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            / <Link className="hover:underline" to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrums;
