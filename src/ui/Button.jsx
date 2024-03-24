import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    " inline-block rounded-full bg-yellow-400 text-small font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-slate-400 disabled:cursor-not-allowed ";

  const styles = {
    small: base + " py-2 md:px-5 md:py-2 text-xs",
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    secondary:
      " text-xs inline-block rounded-full border-2 border-stone-200 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-800 focus:ring-offset-2 active:bg-slate-400 disabled:cursor-not-allowed px-3 py-2.5 md:px-5 md:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
