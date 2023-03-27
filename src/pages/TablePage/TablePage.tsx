import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { AddProductForm } from "../../components/AddProductForm";
import { Modal } from "../../components/Modal";
import { SearchForm } from "../../components/SearchForm";
import { Table } from "../../components/Table";

export const TablePage: React.FC = () => {
  const { images } = useAppSelector(state => state.images);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(Boolean(images.length))
  }, [images])

  return (
    <div className="TablePage">
      <Table />

      <div className="TablePage_conteiner">
        <SearchForm />
        <AddProductForm />
      </div>

      {showModal && <Modal list={images} />}
    </div>
  )
}