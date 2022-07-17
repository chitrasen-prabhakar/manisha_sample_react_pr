import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ children, activeClassName, withoutQuery, ...props }) => {
  let { asPath } = useRouter();
  //sometimes we want to highlight a link irrespective of it's query strings in this case trim the query stings by passing a prop of withoutQuery={true}
  if (withoutQuery) {
    asPath = asPath.split("?")[0];
  }
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
};

export default ActiveLink;
