import classNames from "classnames";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCount } from "../../features/count";
import { Product } from "../../types/Product";
import { TableProduct } from "../TableProduct";

const header = ['id', 'title', 'description', 'price', 'images', 'rating', 'stock', 'category', 'detail', 'delete'];

export const Table: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);
  const { count } = useAppSelector(state => state.count);
  const dispatch = useAppDispatch();
  const [visibleList, setVisibleList] = useState<Product[]>([]);
  const [sortValue, setSortValue] = useState('');
  const [order, setOrder] = useState(false)
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || '';
  const select = searchParams.get("select") || 'title';

  const sortList = (str: string) => {
    let newList = [...products];

    if (select === 'title') {
      newList = products.filter(obj => (obj.title.toLowerCase()).includes(query.toLowerCase()))
    } else {
      newList = products.filter(obj => (obj.category.toLowerCase()).includes(query.toLowerCase()))
    }
   
    if (str === sortValue && !order) {
      setSortValue('');
      setVisibleList(newList);
      return;
    }

    setSortValue(str);


    switch (str) {
      case 'id':
      case 'title':
      case 'description':
      case 'price':
      case 'rating':
      case 'stock':
      case 'category':
        if (order) {
          newList.sort((a, b) => sortHelper(a[str], b[str]));
        } else {
          newList.sort((a, b) => sortHelper(b[str], a[str]));
        }
        break;


      default:
        break;
    }

    setVisibleList(newList);
    setOrder(!order);
  }

  const sortHelper = useCallback((a: any, b: any) => {
    if (typeof a === 'number') {
      return a - b;
    } else {
      return a.localeCompare(b)
    }
  }, [])

  useEffect(() => {
    setVisibleList(products);
  }, [products])

  useEffect(() => {
    sortList(sortValue);
  }, [select, query])

  const iconNotAdd = (item: string) => {
    return item !== 'images' && item !== 'delete' && item !== 'detail';
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead className="table_thead">
        <tr className="table_thead_tr">
          {header.map((item) => (
            <th
              className="table_thead_tr_th"
              key={item}
            >
              <span
                className={classNames('table_thead_tr_th_span', {
                  'pointer': iconNotAdd(item),
                })}
                onClick={() => sortList(item)}
              >
                {item}
                <span className="table_thead_tr_th_span_icon">
                  {iconNotAdd(item) && sortValue !== item && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  )}
                  {iconNotAdd(item) && sortValue === item && order && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                      <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>
                  )}
                  {iconNotAdd(item) && sortValue === item && !order && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16">
                      <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>
                  )}
                </span>
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {visibleList.map((product, index) => (
          <TableProduct
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </tbody>

      <tfoot className="tfoot">
        <tr className="tfoot_tr">
          <td className="tfoot_tr_td" colSpan={header.length}>
            <label className="tfoot_tr_td_label">
              <span className="tfoot_tr_td_text">
                number of products
              </span>
              <select
                className="tfoot_tr_td_selector"
                value={count}
                onChange={(event) => dispatch(setCount(+event.target.value))}
              >
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='40'>40</option>
                <option value='60'>60</option>
                <option value='100'>100</option>
              </select>
            </label>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}