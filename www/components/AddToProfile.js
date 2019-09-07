import { useContext } from "react";
import { useState } from "react";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { useFetch } from "react-async";

export default () => {
  const user = useLoggedInUser();
  const [inputs, setState] = useState({ title: "", item: "" });
  const { data, error, isLoading, run } = useFetch(
    `${process.env.API_URL}/add`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(inputs)
    }
  );

  const handleInputChange = e => {
    e.persist();
    setState(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    run();
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Add to your profile</div>

      <div>
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Title"
          name="title"
          value={inputs.title}
        />
      </div>

      <div>
        <input
          onChange={handleInputChange}
          type="text"
          name="item"
          value={inputs.item}
        />
      </div>

      <input type="submit" value="Add" />
    </form>
  );
};
