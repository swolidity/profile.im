import { useState } from "react";
import { usePush } from "tipple";

export default () => {
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
    console.log(inputs);
    setState(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    execute();
  };

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
