import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Carousel } from "../../components/Carousel";
import { Product } from "../../types/Product";


export const ProductInfo = () => {
  const { id = '1' } = useParams();
  const { products } = useAppSelector(state => state.products);
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    setTargetIndex(0);
  }, [id])

  const targetProduct: Product = products.find(p => p.id === +id) || {} as Product;
  const {
    brand,
    category,
    description,
    images,
    price,
    rating,
    stock,
    title,
  } = targetProduct;

  return (
    <>
      <div className="info">
        <div className="info_conteiner">
          <div className="info_conteiner_carousel">
            <Carousel
              list={images}
              targetIndex={targetIndex}
              setTargetIndex={setTargetIndex}
            />
          </div>

          <div className="info_conteiner_content">
            <h1 className="info_title">{title}</h1>
            <div className="info_conteiner_content_text">
              {description}
            </div>
            <hr />
            <div className="info_conteiner_content_text">
              <span>
                Brand:
              </span>
              <span>
                {brand}
              </span>
            </div>
            <hr />
            <div className="info_conteiner_content_text">
              <span>
                Price:
              </span>
              <span>
                {price} $
              </span>
            </div>
            <hr />
            <div className="info_conteiner_content_text">
              <span>
                Rating:
              </span>
              <span>
                {rating}
              </span>
            </div>
            <hr />
            <div className="info_conteiner_content_text">
              <span>
                Stock:
              </span>
              <span>
                {stock}
              </span>
            </div>
            <hr />
            <div className="info_conteiner_content_text">
              <span>
                Category:
              </span>
              <span>
                {category}
              </span>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <Link to={'/products'} className="info_link">
        <button className="info_link_button">
          Go to all
        </button>
      </Link>
    </>
  )
}