export const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="home_conteiner">
        <h2>Hello</h2>
        <p>
          My name is Valentyn and this is my test task.
          <br />
          In this project, if you go to the "Products" page,
          you will find a table that pulls data from the
          {' '}
          <a href="https://dummyjson.com/">dummyjson</a>
          {' '}
          website and
          saves it to the Redux store.
          <br />
          By double-clicking, you can edit the content of the table,
          delete items, and go to the product page to display details.
          By clicking on the header, you can sort the table by input
          properties. With the help of forms, you can search for a
          product by its title or category and add a new custom product.
          Clicking on the image will open a modal window with a carousel
          of images.
        </p>

        <div>
          Technologies used:
          <ol>
            <li>React.js</li>
            <li>React Router</li>
            <li>React.classNames</li>
            <li>useSearchParams()</li>
            <li>React Hooks</li>
            <li>Fetch</li>
            <li>Redux toolkit</li>
            <li>Formik and Yup.</li>
          </ol>
        </div>

        <div className="home_links">
          <a href="https://drive.google.com/file/d/11QSDsK6IyFmbVXv99evpSNxIwUWhzs9v/view?usp=sharing" target="_blank" rel="noreferrer">My CV</a>
          <a href="https://github.com/Ivanenko1402" target="_blank" rel="noreferrer">MY Github</a>
          <a href="https://t.me/ValentynIvanenko" target="_blank" rel="noreferrer">My telegramm</a>
        </div>

      </div>
    </div>
  )
}