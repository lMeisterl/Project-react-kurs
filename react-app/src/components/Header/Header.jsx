import styles from './Header.module.css';

function Header() {
	return (
		<img className = {styles.logo} src="/logo.png" alt="Логотип журнала" />
	);
}

export default Header;
