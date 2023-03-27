import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setImages } from "../../features/images";
import { Carousel } from "../Carousel";

type Props = {
  list: string[],
}

export const Modal: React.FC<Props> = ({ list }) => {
  const [targetIndex, setTargetIndex] = useState(0)
  const dispatch = useAppDispatch();

  const change = () => {
    setTargetIndex(0);
    dispatch(setImages([]));
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background" 
        onClick={() => change()}
      />
        <div className="modal-card">
          <header className="modal-card-head">
            <button
              type="button"
              className="delete"
              aria-label="button"
              onClick={() => change()}
            />
          </header>

          <Carousel list={list} targetIndex={targetIndex} setTargetIndex={setTargetIndex} />
        </div>
    </div>
  )
}