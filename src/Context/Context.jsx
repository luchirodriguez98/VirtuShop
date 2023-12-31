import { createContext, useEffect, useState } from "react";
import { formToString, totalPrice } from "../Utils/Utils";

const ContextShoppingCart = createContext();


// eslint-disable-next-line react/prop-types
const ShoppingCartProvider = ({children}) => {

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => error)
    },[]);
    
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [productInfo, setProductInfo] = useState({});
    const [order, setOrder] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [user, setUser] = useState('');
    const [userVisible, setUserVisible] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [isMenuUserOpen, setIsMenuUserOpen ] = useState(false);
    const [isDropDownMenuOpen, setisDropDownMenuOpen] = useState(false);
    const [isProductDetailOpen, setisProductDetailOpen] = useState(false);
    const [isOrderDataOpen, setisOrderDataOpen] = useState(false);
    const [isCheckOutMenuOpen, setisCheckOutMenuOpen] = useState(false);
    const [directionValue, setDirectionValue] = useState({
        street: '',
        number: '',
        aditional: '',
        city: '',
        zipcode: '',
    });
    
    const openProductDetail = () => setisProductDetailOpen(true);
    const closeProductDetail = () => setisProductDetailOpen(false);

    const openOrderData = () => setisOrderDataOpen(true);
    const closeOrderData = () => setisOrderDataOpen(false);

    const openCheckOutMenu = () => {
        setisCheckOutMenuOpen(true)
        setIsMenuUserOpen(false)
        setisDropDownMenuOpen(false);
    };
    const closeCheckOutMenu = () => setisCheckOutMenuOpen(false);

    const saveInfo = (item)=>{
        closeCheckOutMenu() 
        closeOrderData()
        setisDropDownMenuOpen(false)
        setIsMenuUserOpen(false)
        openProductDetail() 
        setProductInfo(item)

    }
    const addProduct = (event, item) =>{
        event.stopPropagation();
        setCount(count + 1)
        setCartProducts([...cartProducts, item])
        openCheckOutMenu() 
        closeProductDetail() 
    }
    const deleteProduct = (itemToDelete) =>{
        let indice = cartProducts.indexOf(itemToDelete);
        cartProducts.splice(indice, 1);
        setCount(count - 1)
    }
    const saveMyOrder= () =>{
        const savedOrder = {
            date: new Date().toLocaleString('es', {day: '2-digit', year: 'numeric', month: 'long'}),
            orderNumber : Math.floor(10000 + Math.random() * 90000),
            product: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts),
            direction: formToString(directionValue),
            pay: 'Efectivo',
            itsPaid: false
        };
        closeOrderData();
        setOrder([...order, savedOrder]);
        setCartProducts([]);
        setDirectionValue('')
    }
    const saveOrderData = ()=>{
        closeCheckOutMenu() 
        openOrderData() 
    }
    const titleLarge = (title)=>{
        if(title === undefined){
            return title
        }else if((title.length) > 40){
            return title.substring(0, 40) + '...';
        } else {
            return title
        }
    }
    const renderIcon = (item) => {
        const isInCart = cartProducts.filter(element => element.id === item.id).length > 0;

        if(!isInCart){
            return(
                <button className="h-8 border border-pink-300 rounded-xl w-52" onClick={(event) => addProduct(event, item)}>Añadir al carrito</button>
            )
        }else if (isInCart){
            return(
                <button className="h-8 bg-pink-300 border border-pink-300 rounded-xl w-52">Producto añadido!</button>
            )
        }
    }
    const avoidCloseModal = (event) => {
        event.stopPropagation(); // Evita que el clic dentro del modal cierre el modal
    }
    const toggleVisibilityUser = () =>{
        setUserVisible(!userVisible)
    }
    const menuToggle = (menu) =>{
        menu((oldStatus)=>!oldStatus)
    }
    const logout = () =>{
        setUser('')
        setUserVisible(false)
        setOrder([])
    }
    const paidOrder = (index)=>{
        setDirectionValue('')
        setOrder((prevState) => {
            const newOrders = [...prevState]; 
            newOrders[index].itsPaid = true;
            return newOrders; 
          });
        }

    console.log(order);

    return (
    <ContextShoppingCart.Provider 
        value={
            {
            items,
            count, 
            isProductDetailOpen,
            isCheckOutMenuOpen, 
            isOrderDataOpen,
            isDropDownMenuOpen,
            isMenuUserOpen, 
            productInfo, 
            cartProducts,
            order,
            searchValue,
            directionValue,
            user,
            userVisible,
            setItems,
            openProductDetail, 
            closeProductDetail, 
            openCheckOutMenu,
            closeCheckOutMenu,
            openOrderData,
            closeOrderData,
            setCount, 
            setProductInfo,
            setCartProducts,
            setOrder,
            setSearchValue,
            setDirectionValue,
            setisDropDownMenuOpen,
            setUser,
            setUserVisible,
            setIsMenuUserOpen,
            saveInfo,
            addProduct,
            deleteProduct,
            saveMyOrder,
            saveOrderData,
            titleLarge,
            renderIcon,
            avoidCloseModal,
            toggleVisibilityUser,
            menuToggle,
            logout,
            paidOrder
            }}>
        {children}
    </ContextShoppingCart.Provider>
)}

export {ShoppingCartProvider, ContextShoppingCart}