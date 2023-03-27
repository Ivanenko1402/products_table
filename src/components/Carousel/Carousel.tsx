import classNames from "classnames";
import { useState } from "react";

type Props = {
  list: string[],
  targetIndex: number,
  setTargetIndex: (num: number) => void,
}

export const Carousel: React.FC<Props> = ({ list, targetIndex, setTargetIndex }) => {

  const changeImg = (num: number) => {
    switch (num) {
      case -1:
        if (targetIndex === 0) {
          setTargetIndex(list.length - 1);
          break;
        }

        setTargetIndex(targetIndex - 1);
        break;
    
      case 1:
        if (targetIndex === list.length - 1) {
          setTargetIndex(0);
          break;
        }

        setTargetIndex(targetIndex + 1);
        break;

      default:
        break;
    }
  }

  return (
    <div className="modal-card-body">
      <div className="title-image">
        <button
          className="title-image_button title-image_button-left"
          onClick={() => changeImg(-1)}
        >
          {'<'}
        </button>
        <img
          src={list[targetIndex]}
          alt="img"
          className="title-image_img"
        />
        <button
          className="title-image_button title-image_button-right"
          onClick={() => changeImg(1)}
        >
          {'>'}
        </button>
      </div>
      <div className="small-images">
        {list.map((img, index) => (
          <div
            key={img}
            className={classNames('small-images_conteiner', {
              'is-active': index === targetIndex
            })}
            onClick={() => setTargetIndex(index)}
          >
            <img
              src={img}
              alt=""
              className="small-images_conteiner_img"
            />
          </div>
        ))}
      </div>

    </div>
  )
}
