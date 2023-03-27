import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setImages } from "../../features/images";
import { deleteProduct, setProducts } from "../../features/products";
import { Product } from "../../types/Product"

type Props = {
  product: Product,
  index: number,
}

export const TableProduct: React.FC<Props> = ({ product, index }) => {
  const {
    id,
    title,
    description,
    price,
    images,
    rating,
    stock,
    category,
  } = product;

  const { products } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState<string | number>('');
  const [inputValue, setInputValue] = useState<string | number>('');

  const doubleClick = (param: string | number) => {
    setShowInput(param);
    setInputValue(param);
  }

  const submit = (param: string) => {
    const newProduct = {
      ...product,
      [param]: inputValue,
    }

    const newList = products.map(product => {
      if (product.id === newProduct.id) {
        return newProduct;
      }

      return product;
    })

    dispatch(setProducts(newList));
    setShowInput('');
    setInputValue('');
  }

  return (
    <tr className={classNames('table-row', { 'table-row-grey': Boolean(index % 2) })}>
      <td className="is-vcentered table-row_cell">
        <div className="is-vcentered table-row_cell">
          {id}
        </div>
      </td>
      <td
        className="is-vcentered table-row_cell"
        onDoubleClick={() => doubleClick(title)}
      >
        {showInput !== title
          ? (
            <div className="is-vcentered table-row_cell">
              {title}
            </div>
          ) : (
              <input
                type="text"
                className="input"
                autoFocus
                value={inputValue}
                onChange={(event => setInputValue(event.target.value))}
                onBlur={() => submit('title')}
              />
            )
        }
      </td>
      <td
        className="is-vcentered description"
        onDoubleClick={() => doubleClick(description)}
      >
        {showInput !== description
          ? description
          : (
              <input
                type="text"
                className="input"
                autoFocus
                value={inputValue}
                onChange={(event => setInputValue(event.target.value))}
                onBlur={() => submit('description')}
              />
            )
        }
      </td>
      <td
        className="is-vcentered price"
        onDoubleClick={() => doubleClick(price)}
      >
        {showInput !== price
          ? (
            <div className="is-vcentered table-row_cell">
              {price + '$'}
            </div>
          ): (
              <input
                type="number"
                className="input"
                autoFocus
                value={inputValue}
                onChange={(event => setInputValue(event.target.value))}
                onBlur={() => submit('price')}
              />
            )
        }
      </td>
      <td className="is-vcentered">
        <div className="is-vcentered table-row_cell">
          <div
            className="image"
            onClick={() => dispatch(setImages(images))}
          >
            <img
              src={images[0]}
              alt={`img ${title}`}
              className="image_img"
            />
          </div>
        </div>
      </td>
      <td
        className="is-vcentered"
        onDoubleClick={() => doubleClick(rating)}
      >
        {showInput !== rating
          ? (
            <div className="is-vcentered table-row_cell">
              {rating}
            </div>
            ) : (
              <input
                type="number"
                className="input"
                autoFocus
                value={inputValue}
                onChange={(event => setInputValue(event.target.value))}
                onBlur={() => submit('rating')}
              />
            )
        }
      </td>
      <td
        className="is-vcentered"
        onDoubleClick={() => doubleClick(stock)}
      >
        {showInput !== stock
          ? (
            <div className="is-vcentered table-row_cell">
              {stock}
            </div>
          ) : (
            <input
              type="number"
              className="input"
              autoFocus
              value={inputValue}
              onChange={(event => setInputValue(event.target.value))}
              onBlur={() => submit('stock')}
            />
          )
        }
      </td>
      <td
        className="is-vcentered"
        onDoubleClick={() => doubleClick(category)}
      >
        {showInput !== category
          ? (
            <div className="is-vcentered table-row_cell">
              {category}
            </div>
          ) : (
              <input
                type="number"
                className="input"
                autoFocus
                value={inputValue}
                onChange={(event => setInputValue(event.target.value))}
                onBlur={() => submit('category')}
              />
            )
        }
      </td>
      <td className="is-vcentered">
        <Link to={`/products/${id}`} className="is-vcentered table-row_cell table-conteiner">
          <button
            className="is-vcentered button"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </button>
        </Link>
      </td>
      <td className="is-vcentered">
        <div className="table-conteiner">
          <button
            className="is-vcentered button table-row_cell"
            type="button"
            onClick={() => dispatch(deleteProduct(product))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}