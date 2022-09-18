import React , { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import { fetchDogById, addDog } from "../index";


const singleDog = ({_dogId, inCart, cartDetails}) => {

  const [singleProduct, setSingleProduct] = useState({})
  const {productID} = useParams()

  useEffect(() => {
    const fetchdata = async () => {
        try {
          const data = await fetchDogById(dogId || _dogId)
          console.log("data",data)
          setSingleProduct(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchdata()
  },[]);


    return (
      <>
      <div className="singleProduct">
        <h3 className={`product-name product-color${((dogId - 1) % 3) + 1}`}>{singleProduct.name}</h3>
        <div>
          <img src={`${singleProduct.imageURL}`} className='imageMedium' alt='dog'/>
        </div>
        <div>
          {singleProduct.description}
        </div>
        <div>
          <div>${singleProduct.price}</div>
        </div>
        <div>
          {singleProduct.inStock ? null : "OUT OF STOCK"}
        </div>
        <div>
          {singleProduct.category}
        </div>
      </div>
      {inCart ? (<span>{cartDetails.price}</span>) : <button>Add to cart</button>}
    </>
  )
}

export default SingleProduct;