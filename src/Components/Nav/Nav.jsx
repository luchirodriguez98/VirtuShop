import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ContextShoppingCart } from "../../Context/Context";
import { totalPrice } from '../../Utils/Utils';
import { DropDownManuNav } from '../DropDrownMenuNav/DropDownMenuNav';
import logo from '../../../assets/logo.png'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Bars3Icon } from '@heroicons/react/24/solid'

const Nav = () =>{


    const context = useContext(ContextShoppingCart);

    // const user = context.user && context.userVisible ? `Hola ${context.user}` : 'Inicia sesion';

    const isCartOpen = () =>{
        if(context.isCheckOutMenuOpen === false){
            context.openCheckOutMenu()
        }else{
            console.log('cart abierta');
            context.closeCheckOutMenu()
        }
    }

    return(
        <nav className="fixed top-0 z-10 flex items-center justify-between w-full px-5 py-3 text-sm font-light bg-white border-b-2 border-gray-100">
            {/* parte derecha */}
            <span className="flex items-center gap-x-2">
                    <NavLink
                        to="/"
                    >
                        <img src={logo} className='w-32 outline-none'></img>
                    </NavLink>
            </span>
            {/* parte izquierda */}
            <ul className="flex items-center justify-between gap-x-2">
                <li>
                    <Bars3Icon onClick={()=>context.menuToggle(context.setisDropDownMenuOpen)} className='relative w-6 h-6 cursor-pointer' />
                        <DropDownManuNav />
                </li>
                <li className="flex flex-row items-center justify-between w-24 h-10 px-3 py-2 rounded-lg cursor-pointer bg-slate-200" onClick={() => isCartOpen() }>
                        <ShoppingCartIcon className="w-6 h-6 text-red-300" />
                        <div className=''>
                        {totalPrice(context.cartProducts)}€
                        </div>
                </li>
            </ul>
        </nav>
        
    )
}

export { Nav }