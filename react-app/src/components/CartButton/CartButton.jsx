import './CartButton.css';

function CartButton({children}) {
	return (
		<button className='cart-button'>
			{children}
		</button>
	);
}

export default CartButton;
