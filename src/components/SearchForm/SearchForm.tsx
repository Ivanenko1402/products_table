import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom"

type Event = ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>;

export const SearchForm = () => {
  const [searchParams, setSearchParams]= useSearchParams();

  const query = searchParams.get("query") || '';
  const select = searchParams.get("select") || 'title';

  const updateSearch = (params: {[key: string]: string | null}) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    })
    setSearchParams(searchParams);
  }

  const onChangeParams = (event: Event) => {
    if (event.target.name === 'select') {
      updateSearch({select: event.target.value === 'title' ? null : event.target.value});
    } else {
      updateSearch({query: event.target.value === '' ? null : event.target.value});
    }
  }

  return (
    <form className="form">
      <h1 className="form_title">Search form:</h1>
      <hr />
      <div className="form_inputs">
        <select
          className="form_inputs_selector"
          name='select'
          value={select}
          onChange={(event) => onChangeParams(event)}
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
        </select>
        <input
          type="search"
          className="form_inputs_input"
          placeholder="Search..."
          name='query'
          value={query}
          onChange={(event) => onChangeParams(event)}
        />
      </div>
    </form>
    )
}