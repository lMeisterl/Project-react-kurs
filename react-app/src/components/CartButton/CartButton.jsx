import './CartButton.css';

function CartButton({children, className}) {
	const cl = 'cart-button' + (className ? ' ' +  className : '');
	return (
		<button className={cl}>
			{children}
		</button>
	);
}

export default CartButton;
