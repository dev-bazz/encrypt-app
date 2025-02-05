import Link from "next/link";
import style from "./style.module.scss";

const FooterModule = () => {
  return ( <footer className={ style.footer }>
    <ul className={ style.footer__container }>
      <li>    <Link href={ "/decrypt" }>Decrypt</Link>
      </li>
      <li>
        <Link href={ "/" }>Encrypt</Link>
      </li>

    </ul>
  </footer> );
};

export default FooterModule;
