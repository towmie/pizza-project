import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 font-pizza uppercase sm:px-6">
      <Link className="tracking-widest" to="/">
        Fast react pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
