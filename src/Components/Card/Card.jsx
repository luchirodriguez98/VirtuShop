import { useContext } from "react"
import { PlusIcon } from '@heroicons/react/24/solid'
import { ContextShoppingCart } from "../../Context/Context"


function Card({item}) {
    const context = useContext(ContextShoppingCart);

    const saveInfo = (item)=>{
        context.openPD() 
        context.setProductInfo(item)
    }
    const addProduct = (productInfo) =>{
        context.setCount(context.count + 1)
        context.setCartProducts([...context.cartProducts, context.productInfo])
        console.log(count);
    }



    return (
            <div className="cursor-pointer w-56 h-60 rounded-lg" onClick={() => saveInfo(item)}>
                <figure className="relative w-full h-4/5 rounded-lg">
                    <span className="absolute bottom-2 left-2 p-1 bg-white rounded-lg text-xs">{item.category?.name}</span>
                    <img className="w-full h-full object-cover rounded-lg" src={item.images[1]} alt={item.description}/>
                    <button onClick={addProduct(item)} className="absolute flex justify-center items-center top-2 right-2 w-6 h-6 p-1 bg-white  rounded-full">
                        <PlusIcon className="h-6 w-6 text-red-500"/>
                    </button>
                </figure>
                <p className="flex justify-between items-center  h-1/5 px-2">
                    <span className="text-sm font-light">{item.title}</span>
                    <span className="text-lg font-medium">${item.price}</span>
                </p>
            </div>
    )
  }
  
  export {Card}
  