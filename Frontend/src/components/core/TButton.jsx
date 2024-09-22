import { Link } from "react-router-dom";


export default function TButton({
  to = "",
  href = "",
  target = "_blank",
  onClick = () => {},
  className = "",
  children,
}) {
  return (
    <>
      {href && (
        <a href={href} target={target} className={className}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={className}>
          {children}
        </Link>
      )}
      {!to && !to && (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </>
  )
}