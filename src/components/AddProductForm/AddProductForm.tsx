import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct } from '../../features/products';

type FormValues = {
  title: string,
  author: string,
  description: string,
  category: string,
  stock: number,
  price: number,
  rating: number,
}

export const AddProductForm = () => {
  const { products } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('required'),
    author: Yup.string().required('required'),
    description: Yup.string().required('required'),
    category: Yup.string().required('required'),
    stock: Yup.number()
      .min(1, 'stock must be > 0')
      .required('required'),
    price: Yup.number()
      .min(0.1, 'price must be > 0')
      .required('required'),
    rating: Yup.number()
      .min(0.1, 'rating must be > 0')
      .max(5, 'rating must be <= 5')
      .required('required'),
  });

  const getNewId = () => {
    let newId = 0;

    for (let i = 1; i <= products.length; i++) {
      for (const product of products) {
        if (product.id === newId) {
          newId++;
        }
      }
    }

    return newId;
  }

  const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    const newProduct: Product = {
      ...values,
      id: getNewId(),
      year: new Date(),
      thumbnail: '',
      discountPercentage: 0,
      brand: 'noname',
      images: ['https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'],
    }

    dispatch(addProduct(newProduct))

    resetForm();
  };

  const initialValues: FormValues = {
    title: '',
    author: '',
    description: '',
    category: '',
    stock: 0,
    price: 0,
    rating: 0,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
    {({ errors, touched }) => (
    <div className='add-form'>
      <h1 className='add-form_title'>Add form:</h1>
      <hr />
      <Form className='add-form_form'>
        <div className='add-form_text-inputs'>
          <div>
            <Field
              type="text"
              name="title"
              placeholder={errors.title && touched.title ? 'Title is required!' : 'Title...'}
              className={classNames('add-form_text-inputs_input', {
                'error': errors.title && touched.title
              })}
            />
          </div>
          
          <div>
            <Field
              type="text"
              name="description"
              placeholder={errors.description && touched.description ? 'Description is required!' : 'Description...'}
              className={classNames('add-form_text-inputs_input', {
                'error': errors.description && touched.description
              })}
            />
          </div>

          <div>
            <Field
              type="text"
              name="author"
              placeholder={errors.author && touched.author ? 'Author is required!' : 'Author...'}
              className={classNames('add-form_text-inputs_input', {
                'error': errors.author && touched.author
              })}
            />
          </div>
          
          <div>
            <Field
              type="text"
              name="category"
              placeholder={errors.category && touched.category ? 'Category is required!' : 'Category...'}
              className={classNames('add-form_text-inputs_input', {
                'error': errors.category && touched.category
              })}
            />
          </div>
        </div>

        <div className='add-form_number-inputs'>
          <div className='add-form_number-inputs_input'>
            <label htmlFor="price">Price</label>
            <Field
              className={classNames('add-form_number-inputs_input', {
                'error': errors.price && touched.price
              })}
              type="number"
              name="price"
            />
            <ErrorMessage name="price" component="div" className="error" />
          </div>

          
          <div className='add-form_number-inputs_input'>
            <label htmlFor="stock">Stock</label>
            <Field
              className={classNames('add-form_number-inputs_input', {
                'error': errors.stock && touched.stock
              })}
              type="number"
              name="stock"
            />
            <ErrorMessage name="stock" component="div" className="error" />
          </div>

          <div className='add-form_number-inputs_input'>
            <label htmlFor="rating">Rating</label>
            <Field
              className={classNames('add-form_number-inputs_input', {
                'error': errors.rating && touched.rating
              })}
              type="number"
              name="rating"
            />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>
        </div>

        <button
          className='add-form_button'
          type="submit"
        >
          ADD
        </button>
      </Form>
    </div>
    )}
  </Formik>
  )
};
