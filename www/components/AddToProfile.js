import { useContext } from "react";
import { useState } from "react";
import { usePush } from "tipple";
import CurrentUserContext from "../context/currentUser";

export default () => {
  const currentUser = useContext(CurrentUserContext);
  const [inputs, setState] = useState({ title: "", item: "" });
  const [req, execute, clear] = usePush("/add", {
    domains: ["profile-items"],
    fetchOptions: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs)
    }
  });

  const handleInputChange = e => {
    e.persist();
    setState(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    execute();
  };

  if (!currentUser) {
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
