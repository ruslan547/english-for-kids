import './Footer.scss';
import logo from './rs_school_js.svg';

function Footer(): JSX.Element {
  return (
    <div className="footer">
      <a className="footer__gh" href="https://github.com/ruslan547">GitHub</a>
      <span>
        &copy;
        2021
      </span>
      <a className="footer__rss" href="https://rs.school/js/">
        <img src={logo} alt="" />
      </a>
    </div>
  );
}

export default Footer;
